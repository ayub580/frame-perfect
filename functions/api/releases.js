import { cachedJsonGet, jsonError } from "../../lib/proxy.js";

const STEAM_FEATURED_URL =
  "https://store.steampowered.com/api/featuredcategories?cc=US&l=english";
const STEAM_APPDETAILS_URL =
  "https://store.steampowered.com/api/appdetails";

const MONTHS = {
  jan: 1, january: 1,
  feb: 2, february: 2,
  mar: 3, march: 3,
  apr: 4, april: 4,
  may: 5,
  jun: 6, june: 6,
  jul: 7, july: 7,
  aug: 8, august: 8,
  sep: 9, sept: 9, september: 9,
  oct: 10, october: 10,
  nov: 11, november: 11,
  dec: 12, december: 12,
};

function pad2(n) {
  return String(n).padStart(2, "0");
}

/**
 * Parses Steam release date strings like "19 Nov, 2026" or "Nov 19, 2026" into YYYY-MM-DD.
 * Returns null for vague dates such as "Coming soon" or "Q4 2026".
 */
function parseSteamDate(raw) {
  if (!raw || typeof raw !== "string") return null;
  const s = raw.trim();

  const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) return s;

  // "19 Nov, 2026" or "19 November 2026"
  const dmy = s.match(/^(\d{1,2})\s+([A-Za-z]+),?\s+(\d{4})$/);
  if (dmy) {
    const month = MONTHS[dmy[2].toLowerCase()];
    const day = Number(dmy[1]);
    const year = Number(dmy[3]);
    if (month && day >= 1 && day <= 31) {
      return `${year}-${pad2(month)}-${pad2(day)}`;
    }
  }

  // "Nov 19, 2026" or "November 19 2026"
  const mdy = s.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (mdy) {
    const month = MONTHS[mdy[1].toLowerCase()];
    const day = Number(mdy[2]);
    const year = Number(mdy[3]);
    if (month && day >= 1 && day <= 31) {
      return `${year}-${pad2(month)}-${pad2(day)}`;
    }
  }

  return null;
}

function slugify(name, id) {
  const base = String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || `steam-${id}`;
}

function mapPlatforms(platformsObj, fallbackItem) {
  const p = platformsObj || {
    windows: Boolean(fallbackItem?.windows_available),
    mac: Boolean(fallbackItem?.mac_available),
    linux: Boolean(fallbackItem?.linux_available),
  };
  const out = [];
  if (p.windows) out.push({ platform: { name: "PC" } });
  if (p.mac) out.push({ platform: { name: "macOS" } });
  if (p.linux) out.push({ platform: { name: "Linux" } });
  return out;
}

async function fetchAppDetails(id) {
  const url = `${STEAM_APPDETAILS_URL}?appids=${encodeURIComponent(id)}&cc=US&l=english`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "frame-perfect/1.0",
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Steam appdetails returned ${res.status}`);
  }
  const json = await res.json();
  const entry = json && json[String(id)];
  return entry && entry.success && entry.data ? entry.data : null;
}

export function onRequest(context) {
  return cachedJsonGet(context, {
    edgeTtl: 1800, // 30 minutes
    clientTtl: 300, // 5 minutes
    load: async (incomingUrl) => {
      let featuredRes;
      try {
        featuredRes = await fetch(STEAM_FEATURED_URL, {
          method: "GET",
          headers: {
            "User-Agent": "frame-perfect/1.0",
            Accept: "application/json",
          },
        });
      } catch {
        return {
          errorResponse: jsonError(502, "Steam featured categories request failed"),
        };
      }

      if (!featuredRes.ok) {
        return {
          errorResponse: jsonError(
            502,
            `Steam featured categories returned ${featuredRes.status}`
          ),
        };
      }

      let featured;
      try {
        featured = await featuredRes.json();
      } catch {
        return {
          errorResponse: jsonError(502, "Invalid response from Steam"),
        };
      }

      const rawItems = [
        ...(Array.isArray(featured?.new_releases?.items)
          ? featured.new_releases.items
          : []),
        ...(Array.isArray(featured?.coming_soon?.items)
          ? featured.coming_soon.items
          : []),
      ];

      const requestedSize = Number(incomingUrl.searchParams.get("page_size"));
      const limit = Number.isFinite(requestedSize)
        ? Math.max(1, Math.min(20, Math.floor(requestedSize)))
        : 15;

      const seen = new Set();
      const candidates = [];
      for (const item of rawItems) {
        if (!item || !item.id || !item.name || seen.has(item.id)) continue;
        seen.add(item.id);
        candidates.push(item);
        if (candidates.length >= limit) break;
      }

      if (candidates.length === 0) {
        return { data: { results: [] } };
      }

      const settled = await Promise.allSettled(
        candidates.map((item) => fetchAppDetails(item.id))
      );

      let anySucceeded = false;
      const results = [];

      for (let i = 0; i < candidates.length; i++) {
        const item = candidates[i];
        const outcome = settled[i];
        if (outcome.status !== "fulfilled") continue;
        anySucceeded = true;

        const details = outcome.value;
        if (!details) continue;

        const released = parseSteamDate(details.release_date?.date);
        if (!released) continue;

        const name = details.name || item.name;
        results.push({
          slug: slugify(name, item.id),
          name,
          released,
          platforms: mapPlatforms(details.platforms, item),
          genres: Array.isArray(details.genres)
            ? details.genres
                .filter((g) => g && g.description)
                .map((g) => ({ name: g.description }))
            : [],
          background_image:
            details.header_image ||
            item.header_image ||
            `https://cdn.akamai.steamstatic.com/steam/apps/${item.id}/header.jpg`,
        });
      }

      if (!anySucceeded) {
        return {
          errorResponse: jsonError(502, "Steam appdetails requests failed"),
        };
      }

      return { data: { results } };
    },
  });
}
