const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all users
router.get('/', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// Get single user by ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// Create new user
router.post('/', async (req, res) => {
    const { username, password } = req.body; 
    const newUser = await prisma.user.create({
        data: { username, password }
    });
    res.json(newUser);
});

module.exports = router;
