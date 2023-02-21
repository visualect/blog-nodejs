const express = require('express');
const router = express.Router();
const {
    getPosts,
    getPost,
    deletePost,
    putEdit,
    postAddPost,
} = require('../controllers/api-post-controller.js')

// Get all posts 
router.get('/api/posts', getPosts);
// Add new post
router.post('/api/post', postAddPost);
// Get post by ID
router.get('/api/post/:id', getPost)
// Delete post by ID
router.delete('/api/post/:id', deletePost);
// Update post by ID
router.put('/api/post/:id', putEdit);

module.exports = router;