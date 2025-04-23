const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create the social-media directory if it doesn't exist
const socialMediaDir = path.join(__dirname, 'images', 'social-media');
if (!fs.existsSync(socialMediaDir)) {
    fs.mkdirSync(socialMediaDir, { recursive: true });
}

// List of usernames and display names for profile images
const profiles = [
    { username: 'zendaya', displayName: 'Zendaya', color: '#FF5733' },
    { username: 'chris-evans', displayName: 'Chris Evans', color: '#3498DB' },
    { username: 'liam', displayName: 'Liam', color: '#2ECC71' },
    { username: 'emma', displayName: 'Emma', color: '#9B59B6' },
    { username: 'jessica', displayName: 'Jessica', color: '#F1C40F' },
    { username: 'jay', displayName: 'Jay', color: '#E74C3C' },
    { username: 'sarah', displayName: 'Sarah', color: '#1ABC9C' },
    { username: 'jenna', displayName: 'Jenna', color: '#D35400' },
    { username: 'ryan', displayName: 'Ryan', color: '#34495E' },
    { username: 'millie', displayName: 'Millie', color: '#8E44AD' }
];

// Function to create a circular profile image with initials
function createProfileImage(displayName, color, outputPath) {
    // Create a canvas with dimensions 200x200
    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext('2d');
    
    // Fill the background with white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 200, 200);
    
    // Draw a colored circle
    ctx.beginPath();
    ctx.arc(100, 100, 90, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    
    // Add a border
    ctx.strokeStyle = '#DDDDDD';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Add initials
    const initials = displayName.split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase();
    
    ctx.font = 'bold 80px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, 100, 100);
    
    // Save the image to a file
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(outputPath, buffer);
    
    console.log(`Created profile image for ${displayName} at ${outputPath}`);
}

// Create profile images
profiles.forEach(profile => {
    const profileImagePath = path.join(socialMediaDir, `${profile.username}-profile.jpg`);
    createProfileImage(profile.displayName, profile.color, profileImagePath);
});

console.log('All profile images created successfully!');
