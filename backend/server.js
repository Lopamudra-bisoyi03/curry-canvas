const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Temporary storage for recipes
const recipes = [];


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Get all recipes
app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

// Add a new recipe
app.post('/api/recipes', upload.single('photo'), (req, res) => {
  const newRecipe = {
    id: Math.random().toString(36).substr(2,9),
    name: req.body.name,
    ingredients: JSON.parse(req.body.ingredients),
    steps: JSON.parse(req.body.steps),
    photo: req.file ? `/uploads/${req.file.filename}` : null,
  }
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// Delete a recipe by ID
app.delete('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  const index = recipes.findIndex(recipe => recipe.id === id);
  if (index !== -1) {
    recipes.splice(index, 1);
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
