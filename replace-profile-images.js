const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, 'images', 'social-media');
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Use the original filename from the request
    cb(null, req.body.filename);
  }
});

const upload = multer({ storage: storage });

// Serve static files
app.use(express.static(__dirname));

// Handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.json({
      success: true,
      message: `File ${req.body.filename} uploaded successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Please open the following URL in your browser:');
  console.log(`http://localhost:${port}/save-profile-images.html`);
});

console.log('Starting server to handle profile image uploads...');
console.log('Please install required dependencies if not already installed:');
console.log('npm install express multer');
