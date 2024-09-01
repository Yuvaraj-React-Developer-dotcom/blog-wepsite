const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// Get all post 

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("find get all data error", err)
    }
})

// Get a single post by id

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "POST NOT FOUND" })
        }
        res.json(post);

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("find get single data error", err)
    }
})

// create a single post

router.post('/', async (req, res) => {
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            author: req.body.author,
            image: req.body.image,
        })

        try {
            const newPost = await post.save();
            res.status(201).json(newPost);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("find post single data error", err)
    }
})

// update a single post

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "POST NOT FOUND" })
        }
        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        post.category = req.body.category || post.category;
        post.author = req.body.author || post.author;
        post.image = req.body.image || post.image;
        post.updatedAt = Date.now();
        const upadatedPost = await post.save();
        res.json(upadatedPost);

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log("find upate single data error", err)
    }
})

// delete a single post

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "POST NOT FOUND" })
        }
        await Post.findByIdAndDelete(post._id)
        res.json({ message: "Data deleted successfully" })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;