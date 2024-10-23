const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
// Be careful with the password here
mongoose.connect('mongodb+srv://freeand29:Ay5BMakwJz1Vu41S@cluster0.2idxo.mongodb.net/greenLightTestUser?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using the current timestamp and original name
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed (jpeg, jpg, png, gif)'));
  }
};

// Initialize multer with storage engine and file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define a simple schema
const ItemSchema = new mongoose.Schema({
  user: String,
  photo: String,
  createdAt: { type: Date, default: Date.now },
});


// adding new collection to db in cluster
// connecting to existing collection
const Item = mongoose.model('Item', ItemSchema, 'items');

// API Routes
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// this posts the file path, so it can be found again locally
// need to get the actual photo to be uploaded so it can be retrieved by another device
app.post('/items', upload.single('photo'), async (req, res) => {
  try {
    // Access the 'user' field from the form data
    const { user } = req.body;

    console.log(req.body);

    // Access the uploaded file information
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    // Construct the photo URL or path
    // If you're serving static files, you can provide a URL. Otherwise, store the path.
    const photoPath = req.file.path; // Adjust if needed

    // Create a new item with the user and photo
    const newItem = new Item({
      user,
      photo: photoPath, // Store the photo URL or path
    });

    // Save the item to the database
    await newItem.save();

    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    console.error('Error in POST /items:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});