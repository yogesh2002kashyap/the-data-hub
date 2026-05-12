const express = require('express');
const router = express.Router();
const {
        getAllPosts,
        getPostById,
        createPost,
        updatePost,
        deletePost
    } = require('../controllers/postController')

//GET /api/posts/ - fetch all posts
router.get('/', getAllPosts);

//GET /api/posts/:id - fetch one post by ID
router.get('/:id', getPostById);

//POST /api/posts - create a new post
router.post('/', createPost);

//PUT /api/posts/:id - update a post by id
router.put('/:id', updatePost);

//DELETE /api/posts/:id - delete a post by id
router.delete('/:id', deletePost);

module.exports = router;
