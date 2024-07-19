const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the original file extension
  }
});

  
  const upload = multer({ storage: storage });
  
  // Serve static files from the uploads directory
  app.use('/uploads', express.static(uploadsDir));
  
  // Endpoint for file uploads
  app.post('/upload', upload.single('image'), (req, res) => {
    res.send({ imageUrl: `http://localhost:${port}/uploads/${req.file.filename}` });
  });
  
  // Simple get request to test
  app.get('/hello', (req, res) => {
    res.send('Hello from the backend!');
  });
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
