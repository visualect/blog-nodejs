const { Post } = require('../models/post.js');

const handleError = (res, err) => {
    res.status(500).send(err.message);
}

const getPosts = (req, res) => {
    Post
        .find()
        .sort()
        .then(post => res.status(200).json(post))
        .catch(err => handleError(res, err));
};

const getPost = (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => res.status(200).json(post))
        .catch(err => handleError(res, err))
}

const deletePost = (req, res) => {
    const response = {
        id: req.params.id,
        message: 'post succesfully deleted',
    }
    Post
        .findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json(response))
        .catch(err => handleError(res, err))
}

const putEdit = (req, res) => {
    const { title, author, text } = req.body;
    const id = req.params.id
    Post
        .findByIdAndUpdate(id, { title, author, text }, { new: true })
        .then(post => res.status(200).json(post))
        .catch(err => handleError(res, err))
}

const postAddPost = (req, res) => {
    const { title, author, text } = req.body;
    const post = new Post({ title, author, text });
    post
        .save()
        .then(post => res.status(200).json(post))
        .catch(err => handleError(res, err))
}

module.exports = {
    getPosts,
    getPost,
    deletePost,
    putEdit,
    postAddPost,
};