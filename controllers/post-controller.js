const { Post } = require('../models/post.js');
const getPath = require('../helpers/get-path.js');

const handleError = (res, err) => {
    console.log(err);
    res.render(getPath('error'), { title: 'Error', style: '/error.css' })
}

const getPosts = (req, res) => {
    const title = 'Posts';
    const style = '/posts.css'
    Post
        .find()
        .sort()
        .then(posts => res.render(getPath('posts'), { posts, title, style }))
        .catch(err => handleError(res, err));
};

const getPost = (req, res) => {
    const title = 'Post';
    const style = '/post.css'
    Post
        .findById(req.params.id)
        .then(post => res.render(getPath('post'), { post, title, style }))
        .catch(err => handleError(res, err))
}

const deletePost = (req, res) => {
    const title = 'Post';
    const style = '/post.css'
    Post
        .findByIdAndDelete(req.params.id)
        .then(result => {
            res.sendStatus(200);
        })
        .catch(err => handleError(res, err))
}

const getEdit = (req, res) => {
    const title = 'Edit Post';
    const style = '/add-post.css'
    Post
        .findById(req.params.id)
        .then(post => res.render(getPath('edit-post'), { post, title, style }))
        .catch(err => handleError(res, err))
}

const putEdit = (req, res) => {
    const { title, author, text } = req.body;
    const id = req.params.id
    Post
        .findByIdAndUpdate(id, { title, author, text })
        .then(result => res.redirect(`/posts/${id}`))
        .catch(err => handleError(res, err))
}

const postAddPost = (req, res) => {
    const { title, author, text } = req.body;
    const post = new Post({ title, author, text });
    post
        .save()
        .then(result => res.redirect('/posts'))
        .catch(err => handleError(res, err))
}

const getAddPost = (req, res) => {
    const title = 'Add post';
    const style = '/add-post.css'
    res.render(getPath('add-post'), { title, style })
}

module.exports = {
    getPosts,
    getPost,
    deletePost,
    getEdit,
    putEdit,
    postAddPost,
    getAddPost,
};