const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// In-memory databse
let blogPosts = [];
let nextId = 1; // auto-increment counter

// Middleware — parse incoming JSON bodies
app.use(express.json());

// Make blogPosts and nextId accessible to controllers
app.locals.blogPosts = blogPosts;
app.locals.getNextId = () => nextId++;

const postRouter = require('./routes/posts');
app.use('/api/posts', postRouter);

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