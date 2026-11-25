import { jsonError, proxyGet } from "../../../lib/proxy.js";

const SPEEDRUN_API_PREFIX = "/api/speedrun/";

export function onRequest(context) {
  return proxyGet(context, {
    clientTtl: 60, // 1 minute
    edgeTtlForStatus: (status) => {
      if (status === 200) return 300; // 5 minutes
      if (status === 404) return 60; // 1 minute
      return 0;
    },
    buildTarget: (incomingUrl) => {
      const subpath = incomingUrl.pathname.startsWith(SPEEDRUN_API_PREFIX)
        ? incomingUrl.pathname.slice(SPEEDRUN_API_PREFIX.length)
        : "";

      let decoded;
      try {
        decoded = decodeURIComponent(subpath);
      } catch {
        return { errorResponse: jsonError(400, "Invalid speedrun API path") };
      }

      if (
        !subpath ||
        subpath.startsWith("/") ||
        decoded.includes("\\") ||
        decoded.split("/").some((seg) => seg === "." || seg === "..")
      ) {
        return { errorResponse: jsonError(400, "Invalid speedrun API path") };
      }

      const target = new URL(`https://www.speedrun.com/api/v1/${subpath}`);
      if (
        target.origin !== "https://www.speedrun.com" ||
        !target.pathname.startsWith("/api/v1/")
      ) {
        return { errorResponse: jsonError(400, "Invalid speedrun API path") };
      }

      target.search = incomingUrl.search;
      return { url: target };
    },
  });
}
