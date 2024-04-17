const express = require('express');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
