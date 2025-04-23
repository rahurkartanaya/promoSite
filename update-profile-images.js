const fs = require('fs');
const path = require('path');

// Define the profile images mapping
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

// Create a simple HTML file to help the user save the images
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Save Profile Images</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .image-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 30px;
    }
    .image-item {
      text-align: center;
    }
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #ccc;
    }
    .instructions {
      background-color: #f0f0f0;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <h1>Save Profile Images</h1>
  
  <div class="instructions">
    <h2>Instructions:</h2>
    <ol>
      <li>For each image below, right-click and select "Save Image As..."</li>
      <li>Save the image to the <code>images/social-media/</code> directory with the filename shown below each image</li>
      <li>Make sure to save all 10 images</li>
    </ol>
  </div>
  
  <div class="image-container">
    ${profileImages.map(profile => `
      <div class="image-item">
        <img src="PLACEHOLDER_URL" alt="${profile.username}">
        <p><strong>${profile.username}</strong></p>
        <p>Save as: <code>${profile.name}</code></p>
      </div>
    `).join('')}
  </div>
  
  <p>After saving all images, you can close this page and continue with the website.</p>
</body>
</html>
`;

// Write the HTML file
fs.writeFileSync('save-profile-images.html', htmlContent);
console.log('Created save-profile-images.html');

// Create a script to update the social-media.html file
console.log('Profile images have been prepared. Please save the circular images to the images/social-media/ directory.');
