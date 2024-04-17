const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/post');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Route handlers
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Juicebox API');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
