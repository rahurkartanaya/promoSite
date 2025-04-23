const fs = require('fs');
const path = require('path');

// Create directory if it doesn't exist
const dir = path.join(__dirname, 'images', 'us-movie-posters');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Source movie poster files
const sourcePosterFiles = [
  'AI assignment movie poster US-07.png',
  'AI assignment movie poster US-08.png',
  'AI assignment movie poster US-09.png'
];

// Copy each source file to multiple destination files
sourcePosterFiles.forEach((sourceFile, sourceIndex) => {
  // Check if source file exists
  if (!fs.existsSync(sourceFile)) {
    console.error(`Source file not found: ${sourceFile}`);
    return;
  }

  // Read the source file
  const sourceData = fs.readFileSync(sourceFile);
  
  // Determine which destination files should use this source file
  const destinationIndices = [];
  if (sourceIndex === 0) {
    // First source file (US-07.png) -> Posters 1, 4, 7, 10
    destinationIndices.push(1, 4, 7, 10);
  } else if (sourceIndex === 1) {
    // Second source file (US-08.png) -> Posters 2, 5, 8
    destinationIndices.push(2, 5, 8);
  } else if (sourceIndex === 2) {
    // Third source file (US-09.png) -> Posters 3, 6, 9
    destinationIndices.push(3, 6, 9);
  }
  
  // Copy to each destination file
  destinationIndices.forEach(destIndex => {
    const destFile = path.join(dir, `us-movie-poster-${destIndex}.jpg`);
    fs.writeFileSync(destFile, sourceData);
    console.log(`Copied ${sourceFile} to ${destFile}`);
  });
});

console.log('Done copying movie posters.');
