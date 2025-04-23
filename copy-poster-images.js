// This script copies the existing movie poster images to use as post images
// for a more realistic look until the actual images are provided

const fs = require('fs');
const path = require('path');

// Source poster images
const posterImages = [
    'AI assignment movie poster US-07.png',
    'AI assignment movie poster US-08.png',
    'AI assignment movie poster US-09.png'
];

// Target social media directory
const socialMediaDir = path.join(__dirname, 'images', 'social-media');

// List of usernames for post images
const profiles = [
    'zendaya',
    'chris-evans',
    'liam',
    'emma',
    'jessica',
    'jay',
    'sarah',
    'jenna',
    'ryan',
    'millie'
];

// Copy poster images to use as post images
profiles.forEach((profile, index) => {
    // Use the poster images in rotation
    const posterIndex = index % posterImages.length;
    const sourcePath = path.join(__dirname, posterImages[posterIndex]);
    const targetPath = path.join(socialMediaDir, `${profile}-post.jpg`);
    
    try {
        // Read the source image
        const imageData = fs.readFileSync(sourcePath);
        
        // Write to the target path
        fs.writeFileSync(targetPath, imageData);
        console.log(`Copied poster image to ${profile}-post.jpg`);
    } catch (error) {
        console.error(`Error copying image for ${profile}: ${error.message}`);
    }
});

// Create simple colored squares for profile images
profiles.forEach((profile) => {
    const profileImagePath = path.join(socialMediaDir, `${profile}-profile.jpg`);
    
    // Create a simple colored square as a profile image placeholder
    // In a real scenario, you would use actual profile images
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    const colorIndex = Math.floor(Math.random() * colors.length);
    
    // Create an HTML file with a colored div as a placeholder
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body, html {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
            }
            .profile-placeholder {
                width: 100%;
                height: 100%;
                background-color: ${colors[colorIndex]};
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-family: Arial, sans-serif;
                font-size: 16px;
            }
        </style>
    </head>
    <body>
        <div class="profile-placeholder">${profile.charAt(0).toUpperCase()}</div>
    </body>
    </html>
    `;
    
    fs.writeFileSync(profileImagePath, html);
    console.log(`Created profile image placeholder for ${profile}`);
});

console.log('All images processed successfully!');
