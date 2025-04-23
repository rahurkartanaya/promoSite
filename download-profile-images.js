const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Define the profile images with their URLs and names
const profileImages = [
  { 
    name: 'liam-profile.jpg', 
    username: 'the_real_liam',
    url: 'https://example.com/liam-profile.jpg' // Replace with actual URL
  },
  { 
    name: 'emma-profile.jpg', 
    username: 'cinema.with.emma',
    url: 'https://example.com/emma-profile.jpg' // Replace with actual URL
  },
  { 
    name: 'jessica-profile.jpg', 
    username: 'jessica_travels',
    url: 'https://example.com/jessica-profile.jpg' // Replace with actual URL
  },
  { 
    name: 'jay-profile.jpg', 
    username: 'moviebuff_jay',
    url: 'https://example.com/jay-profile.jpg' // Replace with actual URL
  },
  { 
    name: 'sarah-profile.jpg', 
    username: 'sarah_loves_movies',
    url: 'https://example.com/sarah-profile.jpg' // Replace with actual URL
  },
  { 
    name: 'jenna-profile.jpg', 
    username: 'Jenna Ortega',
    url: 'https://example.com/jenna-profile.jpg' // Replace with actual URL
  },
  { 
    name: 'ryan-profile.jpg', 
    username: 'Ryan Reynolds',
    url: 'https://example.com/ryan-profile.jpg' // Replace with actual URL
  },
  { 
    name: 'millie-profile.jpg', 
    username: 'Millie Bobby Brown',
    url: 'https://example.com/millie-profile.jpg' // Replace with actual URL
  },
  { 
    name: 'chris-evans-profile.jpg', 
    username: 'Chris Evans',
    url: 'https://example.com/chris-evans-profile.jpg' // Replace with actual URL
  },
  { 
    name: 'zendaya-profile.jpg', 
    username: 'Zendaya',
    url: 'https://example.com/zendaya-profile.jpg' // Replace with actual URL
  }
];

// Create the directory if it doesn't exist
const outputDir = path.join(__dirname, 'images', 'social-media-new');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Downloading profile images to ${outputDir}`);

// Function to download an image from a URL
function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(outputPath, () => {}); // Delete the file if there's an error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Download each profile image
async function downloadAllImages() {
  for (const profile of profileImages) {
    const outputPath = path.join(outputDir, profile.name);
    
    try {
      await downloadImage(profile.url, outputPath);
      console.log(`Downloaded ${profile.name} for ${profile.username}`);
    } catch (error) {
      console.error(`Error downloading ${profile.name}: ${error.message}`);
    }
  }
  
  console.log('All profile images have been downloaded successfully!');
}

downloadAllImages();
