const express = require('express');
const router = express.Router();
const {
    getPosts,
    getPost,
    deletePost,
    getEdit,
    putEdit,
    postAddPost,
    getAddPost,
} = require('../controllers/post-controller.js')

router.get('/posts', getPosts);
router.get('/posts/:id', getPost)
router.delete('/posts/:id', deletePost);
router.get('/edit/:id', getEdit);
router.put('/edit/:id', putEdit);
router.post('/add-post', postAddPost);
router.get('/add-post', getAddPost)

module.exports = router;