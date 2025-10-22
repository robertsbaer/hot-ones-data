import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Flame, ChevronLeft, ChevronRight } from "lucide-react";
import allSeasonSauces from "./hotsauceData";
import mergedData from "./merged_hot_ones.json";
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';

// Rename your current App component content to DataVisualization
function DataVisualization() {
  const totalSeasons = Object.keys(allSeasonSauces).length;
  const [currentSeason, setCurrentSeason] = useState<number>(totalSeasons);
  const [highlightedEpisode, setHighlightedEpisode] = useState<string | null>(
    null
  );

  const getHeatColor = (scoville: number) => {
    if (scoville >= 1000000) return "bg-red-600";
    if (scoville >= 500000) return "bg-red-500";
    if (scoville >= 100000) return "bg-orange-500";
    if (scoville >= 50000) return "bg-orange-400";
    if (scoville >= 10000) return "bg-yellow-500";
    return "bg-yellow-300";
  };

  // Function to find all appearances of a guest
  const findAllAppearances = (guestName: string, currentEpisodeId: string) => {
    if (!guestName) return [];
    
    // If the guest is ONLY Sean Evans, don't return any navigation buttons
    if (guestName.toLowerCase() === "sean evans") {
      return [];
    }
    
    const normalizedGuestName = guestName.toLowerCase().trim();
    
    // Special case for short names to prevent false matches
    const shortNames = ["cl", "t-pain", "j balvin"];
    
    // For short names, use exact matching only
    if (shortNames.includes(normalizedGuestName)) {
      return mergedData
        .filter(ep => {
          if (typeof ep.guest === 'string') {
            return ep.guest.toLowerCase() === normalizedGuestName;
          } else if (Array.isArray(ep.guest)) {
            return ep.guest.some(g => g.toLowerCase() === normalizedGuestName);
          }
          return false;
        })
        .map(ep => ({
          id: ep.episode,
          season: ep.season,
          title: ep.episode_type === "special" ? 
                 (ep.guestDescription || (Array.isArray(ep.guest) ? ep.guest.join(', ') : ep.guest)) :
                 (typeof ep.guest === 'string' ? ep.guest : ep.guest.join(', ')),
          date: new Date(ep.date),
          isSpecial: ep.episode_type === "special"
        }))
        .filter(ep => ep.id !== currentEpisodeId);
    }
    
    // Special case for "Daniel Radcliffe" to prevent matching with "CL"
    if (normalizedGuestName.includes("daniel radcliffe")) {
      return mergedData
        .filter(ep => {
          if (typeof ep.guest === 'string') {
            return ep.guest.toLowerCase().includes("daniel radcliffe");
          } else if (Array.isArray(ep.guest)) {
            return ep.guest.some(g => g.toLowerCase().includes("daniel radcliffe"));
          }
          return false;
        })
        .map(ep => ({
          id: ep.episode,
          season: ep.season,
          title: ep.episode_type === "special" ? 
                 (ep.guestDescription || (Array.isArray(ep.guest) ? ep.guest.join(', ') : ep.guest)) :
                 (typeof ep.guest === 'string' ? ep.guest : ep.guest.join(', ')),
          date: new Date(ep.date),
          isSpecial: ep.episode_type === "special"
        }))
        .filter(ep => ep.id !== currentEpisodeId);
    }
    
    // Find in all episodes
    const appearances = mergedData
      .filter(ep => {
        // Skip any episodes with "CL" when looking for other guests
        if ((typeof ep.guest === 'string' && ep.guest.toLowerCase() === "cl") ||
            (Array.isArray(ep.guest) && ep.guest.some(g => g.toLowerCase() === "cl"))) {
          return false;
        }
        
        if (typeof ep.guest === 'string') {
          // Use word boundary matching for short names (3 chars or less)
          if (normalizedGuestName.length <= 3) {
            // Split the guest name by spaces and check if any word exactly matches
            const guestWords = ep.guest.toLowerCase().split(/\s+/);
            return guestWords.includes(normalizedGuestName);
          }
          
          // Handle cases like "Joji and Rich Brian"
          if (ep.guest.toLowerCase().includes(' and ')) {
            const guests = ep.guest.split(' and ').map(g => g.trim().toLowerCase());
            return guests.some(g => 
              g === normalizedGuestName || 
              // For longer names, we can still use partial matching
              (normalizedGuestName.length > 3 && 
               (g.includes(normalizedGuestName) || normalizedGuestName.includes(g)))
            );
          }
          
          // For longer names, use the existing partial matching
          return normalizedGuestName.length > 3 && 
                 (ep.guest.toLowerCase().includes(normalizedGuestName) || 
                  normalizedGuestName.includes(ep.guest.toLowerCase()));
        } else if (Array.isArray(ep.guest)) {
          // For short names, require exact matches
          if (normalizedGuestName.length <= 3) {
            return ep.guest.some(g => g.toLowerCase().trim() === normalizedGuestName);
          }
          
          // For longer names, use partial matching
          return ep.guest.some(g => 
            g.toLowerCase().includes(normalizedGuestName) || 
            normalizedGuestName.includes(g.toLowerCase())
          );
        }
        return false;
      })
      .map(ep => ({
        id: ep.episode,
        season: ep.season,
        title: ep.episode_type === "special" ? 
               (ep.guestDescription || (Array.isArray(ep.guest) ? ep.guest.join(', ') : ep.guest)) :
               (typeof ep.guest === 'string' ? ep.guest : ep.guest.join(', ')),
        date: new Date(ep.date),
        isSpecial: ep.episode_type === "special"
      }));
    
    // Filter out the current episode
    return appearances.filter(ep => ep.id !== currentEpisodeId);
  };

  const sauces =
    allSeasonSauces[currentSeason as keyof typeof allSeasonSauces] ||
    allSeasonSauces[totalSeasons as keyof typeof allSeasonSauces];

  const goToPreviousSeason = () => {
    setCurrentSeason((prev) => (prev > 1 ? prev - 1 : totalSeasons));
  };

  const goToNextSeason = () => {
    setCurrentSeason((prev) => (prev < totalSeasons ? prev + 1 : 1));
  };

  // Update the navigateToEpisode function to work with merged data
  const navigateToEpisode = (episodeId: string) => {
    // Find the episode in the merged data
    const episode = mergedData.find((ep) => ep.episode === episodeId);

    if (episode) {
      // Set the season based on the episode's season
      // For both regular and special episodes, use the season field
      setCurrentSeason(Number(episode.season));

      // Highlight the episode
      setHighlightedEpisode(episodeId);

      // Scroll to the episode after a short delay
      setTimeout(() => {
        const element = document.getElementById(`episode-${episodeId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  };

  // Update the currentGuests calculation to include specials with their corresponding seasons
  const currentGuests = mergedData
    .filter((ep) => {
      if (ep.season === currentSeason.toString()) {
        return true;
      }
      // Include special episodes in their corresponding seasons based on the season field
      if (
        ep.episode_type === "special" &&
        ep.season === currentSeason.toString()
      ) {
        return true;
      }
      return false;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Remove the redirectToSeason function since we're not using it anymore

  const redirectToSeason = (season: string, guestName: string) => {
    if (season === "Special") {
      // Handle navigation to special episodes
      // Find all special episodes with this guest
      const guestSpecials = mergedData.filter(
(ep: { guest?: string | string[] }) =>
          ep.guest &&
          Array.isArray(ep.guest) &&
          ep.guest.some((name) => {
            const normalizedName = name.toLowerCase().trim();
            const normalizedGuestName = guestName.toLowerCase().trim();
            return (
              normalizedName.includes(normalizedGuestName) ||
              normalizedGuestName.includes(normalizedName)
            );
          })
      );

      if (guestSpecials.length > 0) {
        // Sort by date to get the most relevant special (usually the first one)
        guestSpecials.sort(
          (a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        // Get the special episode
        const specialEpisode = guestSpecials[0];

        // Find which regular season this special corresponds to
        const specialDate = new Date(specialEpisode.date);
        const correspondingSeason = mergedData.find(ep => {
          const epDate = new Date(ep.date);
          return epDate <= specialDate && ep.episode_type !== "special";
        })?.season || totalSeasons.toString();

        // Make sure we have a valid numeric season
        if (correspondingSeason && !isNaN(Number(correspondingSeason))) {
          setCurrentSeason(Number(correspondingSeason));
          setHighlightedEpisode(specialEpisode.episode);
        } else {
          // If we can't determine the season, find the closest season
          const allSeasons = Array.from(
            new Set(mergedData.map((g) => Number(g.season)))
          ).filter((s) => !isNaN(s));
          allSeasons.sort((a, b) => a - b);

          // Find the closest season to the special's date
          const specialYear = specialDate.getFullYear();
          const seasonYears = allSeasons.map((s) => {
            const seasonEpisodes = mergedData.filter(
              (g) => g.season === s.toString()
            );
            if (seasonEpisodes.length === 0) return { season: s, year: 2023 }; // Default to recent year if no data

            const avgDate = new Date(
              seasonEpisodes.reduce(
                (sum, ep) => sum + new Date(ep.date).getTime(),
                0
              ) / seasonEpisodes.length
            );
            return { season: s, year: avgDate.getFullYear() };
          });

          // Find season with closest year
          seasonYears.sort(
            (a, b) =>
              Math.abs(a.year - specialYear) - Math.abs(b.year - specialYear)
          );

          if (seasonYears.length > 0) {
            setCurrentSeason(seasonYears[0].season);
            setHighlightedEpisode(specialEpisode.episode);
          } else {
            // Last resort - use the latest season
            setCurrentSeason(totalSeasons);
            setHighlightedEpisode(specialEpisode.episode);
          }
        }
      } else {
        alert("Could not find the special episode.");
      }
    } else {
      // Handle numeric seasons
      const numericSeason = Number(season);
      if (!isNaN(numericSeason)) {
        setCurrentSeason(numericSeason);

        // Get regular episodes for this season
        const regularEpisodes = mergedData.filter((ep) => ep.season === season && ep.episode_type !== "special");

        // Get specials that correspond to this season by date
        const specialsForSeason = mergedData.filter(ep => ep.episode_type === "special").filter(
          (ep) => ep.season === season
        );

        // Combine all episodes for this season
        const episodesForTargetSeason = [
          ...regularEpisodes,
          ...specialsForSeason,
        ];

        // First try to find an exact match
        let candidate = episodesForTargetSeason.find((ep) => {
          // For regular episodes, check the guest field
          if (ep.season !== "Special") {
            return (
              typeof ep.guest === "string" &&
              ep.guest.toLowerCase().includes(guestName.toLowerCase())
            );
          }
          // For specials, check the guest array
          else if (ep.guest && Array.isArray(ep.guest)) {
            return ep.guest.some(
              (name) =>
                name.toLowerCase().includes(guestName.toLowerCase()) ||
                guestName.toLowerCase().includes(name.toLowerCase())
            );
          }
          // Fallback to the guestDescription field for specials without guest array
          else {
            return (
              "guestDescription" in ep &&
              ep.guestDescription
                ?.toLowerCase()
                .includes(guestName.toLowerCase())
            );
          }
        });

        // If no match found, try a more flexible approach
        if (!candidate) {
          candidate = episodesForTargetSeason.find((ep) => {
            if (ep.season !== "Special") {
              const guestParts = (
                typeof ep.guest === "string" ? ep.guest : ep.guest.join(" ")
              )
                .toLowerCase()
                .split(/,|\sand\s|\svs\.\s|\s&\s/i);
              return guestParts.some(
                (part) =>
                  part.trim().includes(guestName.toLowerCase()) ||
                  guestName.toLowerCase().includes(part.trim())
              );
            } else if (ep.guest && Array.isArray(ep.guest)) {
              // For special episodes, check each guest name more thoroughly
              return ep.guest.some((guestItem) => {
                const guestItemParts = guestItem
                  .toLowerCase()
                  .split(/,|\sand\s|\svs\.\s|\s&\s/i);
                return guestItemParts.some(
                  (part) =>
                    part.trim().includes(guestName.toLowerCase()) ||
                    guestName.toLowerCase().includes(part.trim())
                );
              });
            } else {
              return (
                "guestDescription" in ep &&
                (ep as { guestDescription?: string }).guestDescription
                  ?.toLowerCase()
                  .includes(guestName.toLowerCase())
              );
            }
          });
        }

        if (candidate) {
          setHighlightedEpisode(candidate.episode);
        } else {
          setHighlightedEpisode(null);
        }
      } else {
        console.error(`Invalid season format: ${season}`);
        // Default to the latest season if we get an invalid season
        setCurrentSeason(totalSeasons);
        setHighlightedEpisode(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Flame className="text-red-500" size={40} />
            {`Hot Ones Season ${currentSeason} Heat Scale`}
            <Flame className="text-red-500" size={40} />
          </h1>

          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={goToPreviousSeason}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <span className="text-xl">{`Season ${currentSeason}`}</span>
              <button
                onClick={goToNextSeason}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Heat Scale and Trend Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Hot Sauce Heat Scale
              </h2>
              <div className="space-y-4">
                {sauces.map((sauce, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="w-8">{index + 1}</span>
                    <div className="flex-1">
                      <div className="text-sm mb-1">{sauce.name}</div>
                      <div className="h-6 rounded-full bg-gray-700 overflow-hidden">
                        <div
                          className={`h-full ${getHeatColor(
                            sauce.scoville
                          )} transition-all duration-500`}
                          style={{
                            width: `${Math.min(100, sauce.scoville / 30000)}%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {sauce.scoville.toLocaleString()} SHU
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Heat Trends Across Seasons
              </h2>
              <div className="h-[300px] md:h-[400px] lg:h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={Object.entries(allSeasonSauces).map(
                      ([season, sauces]) => ({
                        season: parseInt(season),
                        maxScoville: Math.max(...sauces.map((s) => s.scoville)),
                        minScoville: Math.min(...sauces.map((s) => s.scoville)),
                        avgScoville: Math.round(
                          sauces.reduce((acc, s) => acc + s.scoville, 0) /
                            sauces.length
                        ),
                      })
                    )}
                    margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                  >
                    <XAxis
                      dataKey="season"
                      stroke="#fff"
                      label={{
                        value: "Season",
                        position: "insideBottom",
                        offset: -10,
                      }}
                      tick={{ fontSize: 12 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      stroke="#fff"
                      label={{
                        value: "Scoville Heat Units",
                        angle: -90,
                        position: "insideLeft",
                        offset: 0,
                      }}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) =>
                        value >= 1000000
                          ? `${(value / 1000000).toFixed(1)}M`
                          : value >= 1000
                          ? `${(value / 1000).toFixed(0)}K`
                          : value
                      }
                      width={60}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "none",
                      }}
                      labelStyle={{ color: "#fff" }}
                      formatter={(value: number) =>
                        `${value.toLocaleString()} SHU`
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="maxScoville"
                      stroke="#ef4444"
                      name="Max Scoville"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgScoville"
                      stroke="#f97316"
                      name="Avg Scoville"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="minScoville"
                      stroke="#fbbf24"
                      name="Min Scoville"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Guest List Section */}
          <div className="mt-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={goToPreviousSeason}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <span className="text-xl">{`Season ${currentSeason}`}</span>
              <button
                onClick={goToNextSeason}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">{`Season ${currentSeason} Episodes`}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentGuests.map((episode) => {
                  // Get the guest name for display and search
                  const guestDisplay =
                    episode.episode_type === "special"
                      ? "guestDescription" in episode
                        ? episode.guestDescription
                        : "Special Episode"
                      : episode.guest;

                  // Get the guest name(s) for finding other appearances
                  const guestNames =
                    episode.episode_type === "special"
                      ? Array.isArray(episode.guest)
                        ? episode.guest
                        : []
                      : Array.isArray(episode.guest)
                      ? episode.guest
                      : typeof episode.guest === "string" &&
                        episode.guest.includes(" and ")
                      ? episode.guest.split(" and ").map((name) => name.trim())
                      : [episode.guest];

                  // Find all appearances for each guest
                  const allGuestAppearances = guestNames
                    .map((name) => {
                      const appearances = findAllAppearances(
                        name,
                        episode.episode
                      );
                      return {
                        name,
                        appearances: appearances.sort(
                          (a, b) => a.date.getTime() - b.date.getTime()
                        ),
                      };
                    })
                    .filter((g) => g.appearances.length > 0);

                  return (
                    <div
                      key={episode.episode}
                      id={`episode-${episode.episode}`}
                      className={`p-4 rounded-lg ${
                        episode.isAnniversary
                          ? "bg-gradient-to-br from-yellow-600/80 via-orange-600/80 to-red-600/80 border-2 border-yellow-400"
                          : episode.episode_type === "special"
                          ? "bg-purple-900/70"
                          : "bg-gray-700"
                      } ${
                        episode.episode === highlightedEpisode
                          ? "ring-4 ring-yellow-400"
                          : ""
                      }`}
                    >
                      <div className="text-sm text-gray-400">
                        {episode.episode}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">{guestDisplay}</div>
                        <a
                          href={`https://www.youtube.com/results?search_query=hot+ones+${encodeURIComponent(
                            typeof guestDisplay === "string"
                              ? guestDisplay
                              : Array.isArray(guestDisplay)
                              ? guestDisplay.join(" ")
                              : "" // Provide an empty string if guestDisplay is not a string or array
                          )}+${encodeURIComponent(
                            new Date(episode.date).getFullYear().toString()
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-500 hover:text-red-400 transition-colors"
                        >
                          Watch
                        </a>
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(episode.date).toLocaleDateString()}
                      </div>

                      {allGuestAppearances.length > 0 && (
                        <div className="mt-2">
                          {guestNames.length > 1 ? (
                            // For multi-guest episodes, show each guest with their appearances
                            allGuestAppearances.map((guestApp, idx) => (
                              <div key={idx} className="mb-2">
                                <div className="text-xs text-blue-300">
                                  {guestApp.name} also appears in:
                                </div>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {guestApp.appearances.map((appearance) => (
                                    <button
                                      key={appearance.id}
                                      onClick={() =>
                                        navigateToEpisode(appearance.id)
                                      }
                                      className={`px-2 py-1 text-xs rounded ${
                                        appearance.isSpecial
                                          ? "bg-purple-600 hover:bg-purple-700"
                                          : "bg-blue-500 hover:bg-blue-600"
                                      }`}
                                      title={appearance.title}
                                    >
                                      {appearance.isSpecial
                                        ? `SP ${appearance.id.split(" ")[1]}` // Add "SP" prefix to the ID part
                                        : `S${appearance.season}`}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))
                          ) : (
                            // For single guest episodes, show the standard format
                            <div>
                              <div className="text-xs text-blue-300 mb-1">
                                Also appears in:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {allGuestAppearances[0].appearances.map(
                                  (appearance) => (
                                    <button
                                      key={appearance.id}
                                      onClick={() =>
                                        navigateToEpisode(appearance.id)
                                      }
                                      className={`px-2 py-1 text-xs rounded ${
                                        appearance.isSpecial
                                          ? "bg-purple-600 hover:bg-purple-700"
                                          : "bg-blue-500 hover:bg-blue-600"
                                      }`}
                                      title={appearance.title}
                                    >
                                      {appearance.isSpecial
                                        ? `Special ${
                                            appearance.id.split(" ")[1]
                                          }` // Add "SP" prefix to the ID part
                                        : `S${appearance.season}`}
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {episode.isAnniversary ? (
                        <div className="mt-1 text-xs font-bold text-yellow-200 flex items-center gap-1">
                          🎉 10 Year Anniversary Special 🎉
                        </div>
                      ) : episode.episode_type === "special" ? (
                        <div className="mt-1 text-xs text-purple-300">
                          Special Episode
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-12 py-6 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xl font-bold flex items-center">
              <Flame className="mr-2" size={24} />
              Made with 🔥 by Robert
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://dcmademedia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-red-600 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                Visit My Website
              </a>

              <div className="bg-yellow-300 text-red-800 px-4 py-2 rounded-full font-bold animate-pulse">
                🚨 Will Code For Cash! 🚨
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/data" element={<DataVisualization />} />
    </Routes>
  );
}

export default App;
