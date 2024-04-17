const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authenticate = require('../middleware/authenticate');
const prisma = new PrismaClient();

router.get('/', authenticate, async (req, res) => {
  const posts = await prisma.post.findMany({ where: { authorId: req.user.userId } });
  res.json(posts);
});

router.post('/', authenticate, async (req, res) => {
  const { title, content } = req.body;
  const post = await prisma.post.create({
    data: { title, content, authorId: req.user.userId }
  });
  res.json(post);
});

module.exports = router;
