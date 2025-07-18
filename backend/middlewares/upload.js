// 📁 File: backend/middlewares/upload.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 🔧 Ensure /uploads folder exists
const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 🎯 Configure storage settings
const storage = multer.diskStorage({
  // Where to save uploaded files
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  // Rename the uploaded file to avoid collisions (e.g., 1719400000000.jpg)
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Get file extension
    const timestamp = Date.now();                // Unique timestamp
    cb(null, `${timestamp}${ext}`);              // e.g., 1719401234567.jpg
  }
});

// ✅ Create multer instance
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Optional: Limit files to 5MB
  },
  fileFilter: function (req, file, cb) {
    // Allow only images
    const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('❌ Only image files are allowed!'));
    }
  }
});

module.exports = upload;
