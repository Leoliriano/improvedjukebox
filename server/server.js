const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Authentication Route
app.post('/auth/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, password: hashedPassword },
  });
  res.json(user);
});


app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
