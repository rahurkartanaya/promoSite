const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Define the profile images with their names
const profileImages = [
  { name: 'liam-profile.jpg', username: 'the_real_liam' },
  { name: 'emma-profile.jpg', username: 'cinema.with.emma' },
  { name: 'jessica-profile.jpg', username: 'jessica_travels' },
  { name: 'jay-profile.jpg', username: 'moviebuff_jay' },
  { name: 'sarah-profile.jpg', username: 'sarah_loves_movies' },
  { name: 'jenna-profile.jpg', username: 'Jenna Ortega' },
  { name: 'ryan-profile.jpg', username: 'Ryan Reynolds' },
  { name: 'millie-profile.jpg', username: 'Millie Bobby Brown' },
  { name: 'chris-evans-profile.jpg', username: 'Chris Evans' },
  { name: 'zendaya-profile.jpg', username: 'Zendaya' }
];

// Create the directory if it doesn't exist
const outputDir = path.join(__dirname, 'images', 'social-media');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Saving profile images to ${outputDir}`);

// Copy the existing profile images to the new directory
profileImages.forEach(profile => {
  const sourcePath = path.join(__dirname, 'images', 'social-media-new', profile.name);
  const destPath = path.join(outputDir, profile.name);
  
  try {
    if (fs.existsSync(sourcePath)) {
      const fileContent = fs.readFileSync(sourcePath);
      fs.writeFileSync(destPath, fileContent);
      console.log(`Copied ${profile.name} for ${profile.username}`);
    } else {
      console.log(`Source file ${sourcePath} does not exist`);
    }
  } catch (error) {
    console.error(`Error copying ${profile.name}: ${error.message}`);
  }
});

console.log('Profile images have been saved successfully!');
