const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware imports
const logger = require('./middleware/logger')

// In-memory databse
let blogPosts = [];
let nextId = 1; // auto-increment counter

// Middleware — parse incoming JSON bodies
app.use(express.json());

// Make blogPosts and nextId accessible to controllers
app.locals.blogPosts = blogPosts;
app.locals.getNextId = () => nextId++;

// Routes imports
const postRouter = require('./routes/posts');
const authRouter = require('./routes/auth');

// Global logger middleware comes BEFORE routes
app.use(logger);

// Routes
app.use('/api/posts', postRouter);
app.use('/api', authRouter);

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to The Data Hub 🚀',
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Data Hub running on http://localhost:${PORT}`);
});