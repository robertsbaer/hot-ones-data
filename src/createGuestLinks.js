import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using ES modules approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read both data files
const episodesPath = path.join(__dirname, 'hot_ones_guest.json');
const specialsPath = path.join(__dirname, 'hot_ones_specials.json');

console.log('Reading data files...');
const episodesData = JSON.parse(fs.readFileSync(episodesPath, 'utf8'));
const specialsData = JSON.parse(fs.readFileSync(specialsPath, 'utf8'));
console.log(`Found ${episodesData.length} episodes and ${specialsData.length} specials`);

// Normalize guest names (trim whitespace, convert to lowercase)
const normalizeGuestName = (name) => name.trim().toLowerCase();

// Create a guest appearance index
const guestAppearances = {};
const guestNameMap = {}; // Maps normalized names to original names

// Process regular episodes
console.log('Processing regular episodes...');
episodesData.forEach(episode => {
  const guestName = episode.guest;
  const normalizedName = normalizeGuestName(guestName);
  
  // Store the original name for this normalized version
  guestNameMap[normalizedName] = guestName;
  
  if (!guestAppearances[normalizedName]) {
    guestAppearances[normalizedName] = [];
  }
  
  guestAppearances[normalizedName].push({
    type: 'episode',
    id: episode.id,
    season: episode.season,
    episode: episode.episode,
    title: `Season ${episode.season}, Episode ${episode.episode}`
  });
});

// Process special episodes
console.log('Processing special episodes...');
specialsData.forEach(special => {
  // Skip if guestNames doesn't exist
  if (!special.guestNames || !Array.isArray(special.guestNames)) {
    console.warn(`Special ${special.episode} is missing guestNames array`);
    return;
  }
  
  special.guestNames.forEach(guestName => {
    const normalizedName = normalizeGuestName(guestName);
    
    // Store the original name for this normalized version
    guestNameMap[normalizedName] = guestName;
    
    if (!guestAppearances[normalizedName]) {
      guestAppearances[normalizedName] = [];
    }
    
    guestAppearances[normalizedName].push({
      type: 'special',
      id: special.episode, // Use episode as ID for specials
      title: special.guestDescription || special.episode,
      specialEpisode: special.episode // Add this to identify the special episode
    });
  });
});

// Log some stats about guest appearances
const guestCount = Object.keys(guestAppearances).length;
console.log(`Found ${guestCount} unique guests`);

// Find guests with multiple appearances
const multipleAppearances = Object.entries(guestAppearances)
  .filter(([_, appearances]) => appearances.length > 1)
  .map(([name, appearances]) => ({ 
    name: guestNameMap[name], 
    count: appearances.length 
  }));

console.log(`Found ${multipleAppearances.length} guests with multiple appearances`);
if (multipleAppearances.length > 0) {
  console.log('Examples of guests with multiple appearances:');
  multipleAppearances.slice(0, 5).forEach(guest => {
    console.log(`- ${guest.name}: ${guest.count} appearances`);
  });
}

// Add cross-references to regular episodes
console.log('Adding cross-references to regular episodes...');
const updatedEpisodes = episodesData.map(episode => {
  const guestName = episode.guest;
  const normalizedName = normalizeGuestName(guestName);
  
  // Get all appearances for this guest
  const allAppearances = guestAppearances[normalizedName] || [];
  
  // Filter out the current episode
  const otherAppearances = allAppearances.filter(appearance => 
    !(appearance.type === 'episode' && appearance.id === episode.id)
  );
  
  return {
    ...episode,
    otherAppearances
  };
});

// Add cross-references to special episodes
console.log('Adding cross-references to special episodes...');
const updatedSpecials = specialsData.map(special => {
  // Create a map of guest appearances for this special
  const guestAppearanceMap = {};
  
  if (special.guestNames && Array.isArray(special.guestNames)) {
    special.guestNames.forEach(guestName => {
      const normalizedName = normalizeGuestName(guestName);
      
      // Get all appearances for this guest
      const allAppearances = guestAppearances[normalizedName] || [];
      
      // Filter out the current special
      const otherAppearances = allAppearances.filter(appearance => 
        !(appearance.type === 'special' && appearance.id === special.episode)
      );
      
      if (otherAppearances.length > 0) {
        guestAppearanceMap[guestName] = otherAppearances;
      }
    });
  }
  
  return {
    ...special,
    guestAppearanceMap
  };
});

// Write the updated data back to the files
console.log('Writing updated data back to files...');
fs.writeFileSync(episodesPath, JSON.stringify(updatedEpisodes, null, 2), 'utf8');
fs.writeFileSync(specialsPath, JSON.stringify(updatedSpecials, null, 2), 'utf8');

console.log('Added cross-references for all guest appearances');