// This script creates placeholder images for the social media posts
// It's a simple script to demonstrate the concept
// In a real-world scenario, you would use actual images

const fs = require('fs');
const path = require('path');

// Create the social-media directory if it doesn't exist
const socialMediaDir = path.join(__dirname, 'images', 'social-media');
if (!fs.existsSync(socialMediaDir)) {
    fs.mkdirSync(socialMediaDir, { recursive: true });
}

// List of usernames for profile images
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

// Create profile placeholder images
profiles.forEach(profile => {
    const profileImagePath = path.join(socialMediaDir, `${profile}-profile.jpg`);
    
    // Create a simple text file as a placeholder
    // In a real scenario, you would use actual images
    fs.writeFileSync(profileImagePath, `This is a placeholder for ${profile}'s profile image`);
    console.log(`Created placeholder for ${profile}'s profile image`);
});

// Create post placeholder images
profiles.forEach(profile => {
    const postImagePath = path.join(socialMediaDir, `${profile}-post.jpg`);
    
    // Create a simple text file as a placeholder
    // In a real scenario, you would use actual images
    fs.writeFileSync(postImagePath, `This is a placeholder for ${profile}'s post image`);
    console.log(`Created placeholder for ${profile}'s post image`);
});

console.log('All placeholder images created successfully!');
