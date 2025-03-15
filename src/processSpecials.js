import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using ES modules approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the specials data
const specialsPath = path.join(__dirname, 'hot_ones_specials.json');
const specialsData = JSON.parse(fs.readFileSync(specialsPath, 'utf8'));

console.log('Processing special episodes...');

// Process each special episode
const processedData = specialsData.map(special => {
  // The guest field is already an array, so we can use it directly as guestNames
  if (Array.isArray(special.guest)) {
    return {
      ...special,
      guestNames: special.guest
    };
  }
  
  // If for some reason guest is a string, handle it as before
  if (typeof special.guest === 'string') {
    // Your existing pattern matching code would go here
    console.warn(`Special ${special.episode} has guest as string instead of array`);
    return {
      ...special,
      guestNames: [special.guest]
    };
  }
  
  // If guest is neither an array nor a string, use an empty array
  console.warn(`Special ${special.episode} has invalid guest format`);
  return {
    ...special,
    guestNames: []
  };
});

// Write the processed data back to the file
fs.writeFileSync(specialsPath, JSON.stringify(processedData, null, 2), 'utf8');
console.log('Added guestNames field to all special episodes');