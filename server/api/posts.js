const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all posts
router.get('/', async (req, res) => {
    const posts = await prisma.post.findMany({
        include: { author: true } // Assuming you want to include user details
    });
    res.json(posts);
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const post = await prisma.post.findUnique({ where: { id }, include: { author: true } });
    if (post) {
        res.json(post);
    } else {
        res.status(404).send('Post not found');
    }
});

// Create a new post
router.post('/', async (req, res) => {
    const { title, content, userId } = req.body;
    const newPost = await prisma.post.create({
        data: { title, content, userId }
    });
    res.json(newPost);
});

module.exports = router;
