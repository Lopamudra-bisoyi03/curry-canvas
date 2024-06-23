const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const users = [];
const recipes = [];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'D:/curry-canvas/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Middleware
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, 
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('D:/curry-canvas/uploads'));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Security headers middleware
app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'deny');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  next();
});

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Register a new user
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    res.status(200).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30m' });

  res.cookie('token', `Bearer ${token}`, { httpOnly: true, secure: true, maxAge: 30 * 60 * 1000 });

  res.json({ token, user });
});

// Refresh Token
app.post('/refresh-token', authenticateToken, (req, res) => {
  const token = jwt.sign({ id: req.user.id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '30m' });
  res.cookie('token', `Bearer ${token}`, { httpOnly: true, secure: true, maxAge: 30 * 60 * 1000 });
  res.json({ token });
});

// Validate Token
app.get('/api/validate-token', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Get all recipes
app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

// Add a new recipe
app.post('/api/recipes', authenticateToken, upload.single('photo'), (req, res) => {
  try {
    const newRecipe = {
      id: Math.random().toString(36).substr(2, 9),
      userId: req.user.id,
      name: req.body.name,
      ingredients: JSON.parse(req.body.ingredients),
      steps: JSON.parse(req.body.steps),
      photo: req.file ? `/uploads/${req.file.filename}` : null,
    };
    recipes.push(newRecipe);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(400).json({ message: 'Error adding recipe' });
  }
});

// Get recipes by user ID
app.get('/api/recipes/user/:userId', (req, res) => {
  const { userId } = req.params;
  const userRecipes = recipes.filter(recipe => recipe.userId === userId);
  res.json(userRecipes);
});

// Delete a recipe by ID
app.delete('/api/recipes/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const index = recipes.findIndex(recipe => recipe.id === id);
  if (index !== -1) {
    recipes.splice(index, 1);
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
});

// User logout
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
