// GET /api/posts - return all posts
const getAllPosts = (req, res) => {
    const blogPosts = req.app.locals.blogPosts;

    res.status(200).json({
        status: 'success',
        count: blogPosts.length,
        data: blogPosts,
    });
};

//GET /api/posts/:id - return post by id
const getPostById = (req, res) => {
    const id = parseInt(req.params.id); // convert string -> number
    const blogPosts = req.app.locals.blogPosts;

    const post = blogPosts.find((p) => p.id === id);

    if(!post){
        return res.status(404).json({
            status: 'error',
            message: `post with id ${id} not found`,
        });
    };

    res.status(200).json({
        status: 'success',
        data: post,
    });
};

// POST /api/posts - create a new post
const createPost = (req, res) => {
    const blogPosts = req.app.locals.blogPosts;
    const { title, content, author } = req.body;

    // Basic validation
    if( !title || !content || !author ){
        return res.status(400).json({
            status: 'error',
            message: 'title, content and author are required fields',
        });
    };

    const newPost = {
        id: req.app.locals.getNextId(),
        title,
        content,
        author,
        createdAt: new Date().toISOString(),
    };

    blogPosts.push(newPost);

    res.status(201).json({
        status: 'success',
        message: 'Post created successfully',
        data: newPost,
    });
};

// PUT /api/posts/:id - update a post by id
const updatePost = (req, res) => {
    const blogPosts = req.app.locals.blogPosts;
    const id = parseInt(req.params.id);

    const postIndex = blogPosts.findIndex((p) => p.id === id);

    if(postIndex === -1){
        return res.status(404).json({
            status: 'error',
            message: `Post with id ${id} not found`,
        });
    };

    // merge existing array with new fields from req.body
    blogPosts[postIndex] = {
        ...blogPosts[postIndex], 
        ...req.body,
        id,
        updatedAt: new Date().toISOString(),
    };

    res.status(200).json({
        status: 'success',
        message: 'Post updated successfully',
        data: blogPosts[postIndex],
    });
};

// DELETE /api/posts/:id - remove post by id
const deletePost = (req, res) => {
    const blogPosts = req.app.locals.blogPosts;
    const id = parseInt(req.params.id);

    const exist = blogPosts.find( (p) => p.id === id );

    if(!exist){
        return res.status(404).json({
            status: 'error',
            message: `Post with id ${id} not exist`,
        });
    };

    // replace the array with filtered version
    req.app.locals.blogPosts = blogPosts.filter( (p) => p.id !== id );

    res.status(200).json({
        status: 'success',
        message: `Post with id ${id} id removed successfully`,
    });
};

    module.exports = {
        getAllPosts,
        getPostById,
        createPost,
        updatePost,
        deletePost
    };
