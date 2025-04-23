const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create directory if it doesn't exist
const dir = path.join(__dirname, 'images', 'us-movie-posters');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Function to create a placeholder image
function createPlaceholderImage(filename, width, height, text) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.font = 'bold 30px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // Save image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(filename, buffer);
  console.log(`Created image: ${filename}`);
}

// Create 10 placeholder images
for (let i = 1; i <= 10; i++) {
  const filename = path.join(dir, `us-movie-poster-${i}.jpg`);
  createPlaceholderImage(filename, 800, 1200, `US Movie Poster ${i}`);
}

console.log('Done creating placeholder images for US movie posters.');
