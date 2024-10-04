const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://freeand29:Ay5BMakwJz1Vu41S@cluster0.2idxo.mongodb.net/greenLightUserTest?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a simple schema
const ItemSchema = new mongoose.Schema({
  user: String,
});


// adding new collection to db in cluster
// connecting to existing collection
const Item = mongoose.model('Item', ItemSchema, '/items');

// API Routes
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});