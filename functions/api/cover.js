import { cachedJsonGet, jsonError } from "../../lib/proxy.js";

const STEAM_SEARCH_URL = "https://store.steampowered.com/api/storesearch/";

export function onRequest(context) {
  return cachedJsonGet(context, {
    edgeTtl: 604800, // 7 days
    clientTtl: 3600, // 1 hour
    load: async (incomingUrl) => {
      const query = (
        incomingUrl.searchParams.get("search") ||
        incomingUrl.searchParams.get("term") ||
        incomingUrl.searchParams.get("q") ||
        ""
      ).trim();

      if (!query) {
        return { errorResponse: jsonError(400, "Missing search query") };
      }

      const target = new URL(STEAM_SEARCH_URL);
      target.searchParams.set("term", query);
      target.searchParams.set("l", "english");
      target.searchParams.set("cc", "US");

      let res;
      try {
        res = await fetch(target.toString(), {
          method: "GET",
          headers: {
            "User-Agent": "frame-perfect/1.0",
            Accept: "application/json",
          },
        });
      } catch {
        return { errorResponse: jsonError(502, "Steam store search failed") };
      }

      if (!res.ok) {
        return {
          errorResponse: jsonError(
            502,
            `Steam store search returned ${res.status}`
          ),
        };
      }

      let payload;
      try {
        payload = await res.json();
      } catch {
        return {
          errorResponse: jsonError(502, "Invalid response from Steam search"),
        };
      }

      const items = Array.isArray(payload?.items) ? payload.items : [];
      const results = items
        .filter((item) => item && item.id && item.name)
        .map((item) => ({
          name: item.name,
          background_image: `https://cdn.akamai.steamstatic.com/steam/apps/${item.id}/header.jpg`,
        }));

      return { data: { results } };
    },
  });
}
