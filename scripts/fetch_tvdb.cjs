/*
  Fetch Hot Ones episode data from TheTVDB v4 and write to CHECK_DATA/tvdb_hot_ones.json.

  Usage:
    TVDB_API_KEY=your-key node scripts/fetch_tvdb.js

  Notes:
    - This script logs in with your API key to obtain a bearer token (valid ~1 month).
    - It searches for the "Hot Ones" series and fetches episodes in the default season order.
    - Specials (season 0) are marked as episode_type "special"; others as "regular".
    - It does not attempt to parse guest names; titles are stored in guestDescription.
*/

const fs = require("fs");
const path = require("path");

const BASE_URL = "https://api4.thetvdb.com/v4";

async function login(apiKey) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apikey: apiKey }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `TVDB login failed: ${res.status} ${res.statusText} - ${text}`
    );
  }
  const data = await res.json();
  if (!data || !data.data || !data.data.token) {
    throw new Error("TVDB login response missing token");
  }
  return data.data.token;
}

async function tvdbFetch(pathname, token, query = {}) {
  const url = new URL(`${BASE_URL}${pathname}`);
  Object.entries(query).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `TVDB request failed: ${res.status} ${res.statusText} - ${text}`
    );
  }
  return res.json();
}

async function findHotOnesSeriesId(token) {
  const resp = await tvdbFetch("/search", token, {
    query: "Hot Ones",
    type: "series",
  });
  const results = resp?.data || [];
  if (!results.length) throw new Error('No TVDB results for "Hot Ones"');
  const exact = results.find(
    (r) => (r.name || "").toLowerCase() === "hot ones"
  );
  const series = exact || results[0];
  const rawId = series.id ?? series?.record?.id ?? series?.tvdb_id;
  if (rawId === undefined || rawId === null)
    throw new Error("TVDB series record missing id");
  // Normalize ID: v4 search may return strings like "series-327172"; episodes endpoint requires numeric id
  const normalized =
    typeof rawId === "number"
      ? rawId
      : Number(String(rawId).replace(/\D+/g, ""));
  if (!normalized || Number.isNaN(normalized))
    throw new Error(`Unable to normalize TVDB series id: ${rawId}`);
  return normalized;
}

async function fetchAllEpisodes(token, seriesId) {
  // First try the dedicated episodes endpoint
  try {
    const episodes = [];
    let page = 0; // TVDB pages are 0-based
    while (true) {
      const resp = await tvdbFetch(`/series/${seriesId}/episodes`, token, {
        page,
      });
      const eps = resp?.data?.episodes || resp?.data || [];
      if (!eps.length) break;
      episodes.push(...eps);
      if (resp?.links?.next === null || resp?.links?.next === undefined) {
        page += 1;
      } else {
        page = resp.links.next;
      }
      if (page > 200) break; // safety
    }
    if (episodes.length > 0) return episodes;
  } catch (err) {
    console.warn(
      "/series/{id}/episodes failed, falling back to seasons extended:",
      err.message
    );
  }

  // Fallback: /series/{id}/extended → seasons → /seasons/{id}/extended → episodes
  const sResp = await tvdbFetch(`/series/${seriesId}/extended`, token);
  const seasons = sResp?.data?.seasons || sResp?.data?.series?.seasons || [];
  const airedOrderSeasons = seasons.filter((s) => {
    const typeName = s?.type?.name || s?.typeName || "";
    return (
      typeName.toLowerCase().includes("aired") ||
      typeName.toLowerCase().includes("default")
    );
  });
  const episodes = [];
  for (const season of airedOrderSeasons) {
    if (!season.id) continue;
    const seResp = await tvdbFetch(`/seasons/${season.id}/extended`, token);
    const eps = seResp?.data?.episodes || seResp?.data || [];
    episodes.push(...eps);
  }
  return episodes;
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function mapEpisode(ep) {
  const seasonNumber = ep.seasonNumber ?? ep.season?.number ?? null;
  const episodeNumber = ep.number ?? ep.episodeNumber ?? null;
  const airedIso = ep.aired ?? ep.airDate ?? ep.airedAt ?? null;
  const date = formatDate(airedIso);
  // Build SxxEyy code when possible
  const seasonCode =
    typeof seasonNumber === "number"
      ? String(seasonNumber).padStart(2, "0")
      : "??";
  const episodeCode =
    typeof episodeNumber === "number"
      ? String(episodeNumber).padStart(2, "0")
      : "??";
  const episodeLabel =
    seasonNumber === 0
      ? `SPECIAL ${ep.number ?? ep.id ?? ""}`
      : `S${seasonCode}E${episodeCode}`;

  return {
    season: seasonNumber != null ? String(seasonNumber) : "unknown",
    episode: episodeLabel,
    date: date || airedIso || "unknown",
    guestDescription: ep.name || ep.overview || "Untitled Episode",
    guest: [],
    episode_type: seasonNumber === 0 ? "special" : "regular",
  };
}

async function main() {
  const apiKey = process.env.TVDB_API_KEY;
  if (!apiKey) {
    console.error("Missing TVDB_API_KEY. Set it in your environment.");
    process.exit(1);
  }
  console.log("Logging in to TVDB…");
  const token = await login(apiKey);
  console.log("Login ok. Token acquired.");

  console.log("Searching for series: Hot Ones…");
  const seriesId = await findHotOnesSeriesId(token);
  console.log(`Found series id: ${seriesId}`);

  console.log("Fetching episodes…");
  const eps = await fetchAllEpisodes(token, seriesId);
  console.log(`Fetched ${eps.length} episodes.`);

  const mapped = eps
    .map(mapEpisode)
    .filter((r) => r.date !== "unknown")
    .sort((a, b) => {
      const da = new Date(a.date);
      const db = new Date(b.date);
      return da - db;
    });

  const outDir = path.join(process.cwd(), "CHECK_DATA");
  const outFile = path.join(outDir, "tvdb_hot_ones.json");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(mapped, null, 2));
  console.log(`Wrote ${mapped.length} records to ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
