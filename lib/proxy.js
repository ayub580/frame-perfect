const UPSTREAM_USER_AGENT = "frame-perfect/1.0";

export function jsonError(status, message) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export function methodNotAllowed() {
  return new Response("Method Not Allowed", {
    status: 405,
    headers: {
      Allow: "GET, HEAD",
      "Cache-Control": "no-store",
    },
  });
}

function getCacheStorage() {
  return typeof caches !== "undefined" && caches.default ? caches.default : null;
}

function buildClientHeaders(sourceHeaders, cacheControl) {
  const headers = new Headers(sourceHeaders);
  headers.delete("Set-Cookie");
  headers.delete("Cache-Control");
  headers.delete("Expires");
  headers.delete("Pragma");
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  headers.set("Cache-Control", cacheControl);
  return headers;
}

/**
 * Proxies GET/HEAD requests to an upstream JSON API with Cloudflare edge caching.
 */
export async function proxyGet(context, options) {
  const { request, env, waitUntil } = context;
  if (request.method !== "GET" && request.method !== "HEAD") {
    return methodNotAllowed();
  }

  const incomingUrl = new URL(request.url);
  const built = options.buildTarget(incomingUrl, env);
  if (built.errorResponse) {
    return built.errorResponse;
  }

  const cache = getCacheStorage();
  const cacheUrl = new URL(incomingUrl.toString());
  if (options.sanitizeCacheUrl) {
    options.sanitizeCacheUrl(cacheUrl);
  }
  const cacheKey = new Request(cacheUrl.toString(), { method: "GET" });

  if (cache) {
    const cached = await cache.match(cacheKey);
    if (cached) {
      const clientCacheControl =
        cached.status === 200
          ? `public, max-age=${options.clientTtl}`
          : "public, max-age=60";
      const headers = buildClientHeaders(cached.headers, clientCacheControl);
      return new Response(request.method === "HEAD" ? null : cached.body, {
        status: cached.status,
        headers,
      });
    }
  }

  let upstreamRes;
  try {
    upstreamRes = await fetch(built.url.toString(), {
      method: "GET",
      headers: {
        "User-Agent": UPSTREAM_USER_AGENT,
        Accept: "application/json",
      },
    });
  } catch {
    return jsonError(502, "Upstream request failed");
  }

  const edgeTtl = options.edgeTtlForStatus(upstreamRes.status);
  const body = await upstreamRes.arrayBuffer();

  if (cache && edgeTtl > 0) {
    const cacheHeaders = buildClientHeaders(
      upstreamRes.headers,
      `public, max-age=${edgeTtl}`
    );
    const toCache = new Response(body, {
      status: upstreamRes.status,
      headers: cacheHeaders,
    });
    const putPromise = cache.put(cacheKey, toCache);
    if (typeof waitUntil === "function") {
      waitUntil(putPromise);
    } else {
      await putPromise;
    }
  }

  const clientCacheControl =
    upstreamRes.status === 200
      ? `public, max-age=${options.clientTtl}`
      : edgeTtl > 0
        ? `public, max-age=${Math.min(60, edgeTtl)}`
        : "no-store";
  const clientHeaders = buildClientHeaders(
    upstreamRes.headers,
    clientCacheControl
  );

  return new Response(request.method === "HEAD" ? null : body, {
    status: upstreamRes.status,
    headers: clientHeaders,
  });
}

/**
 * Proxies RAWG /api/games queries using env.RAWG_KEY (never exposed to clients or cache keys).
 */
export function proxyRawg(context, { edgeTtl, clientTtl }) {
  return proxyGet(context, {
    clientTtl,
    edgeTtlForStatus: (status) => (status === 200 ? edgeTtl : 0),
    sanitizeCacheUrl: (cacheUrl) => {
      for (const key of [...cacheUrl.searchParams.keys()]) {
        if (key.toLowerCase() === "key") {
          cacheUrl.searchParams.delete(key);
        }
      }
      cacheUrl.search = cacheUrl.searchParams.toString();
    },
    buildTarget: (incomingUrl, env) => {
      const apiKey = env && env.RAWG_KEY ? String(env.RAWG_KEY).trim() : "";
      if (!apiKey) {
        return {
          errorResponse: jsonError(
            500,
            "RAWG_KEY environment variable is not configured"
          ),
        };
      }

      const target = new URL("https://api.rawg.io/api/games");
      for (const [k, v] of incomingUrl.searchParams.entries()) {
        if (k.toLowerCase() !== "key") {
          target.searchParams.append(k, v);
        }
      }
      target.searchParams.set("key", apiKey);
      return { url: target };
    },
  });
}
