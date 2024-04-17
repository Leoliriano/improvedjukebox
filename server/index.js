const express = require('express');
const app = express();
require('dotenv').config();

app.use(require("body-parser").json());

app.get('/', (req, res) => {
    res.send(`<h1>Juice... The final frontier...</h1>`)
});

app.use('/api', require("./api"));
app.use('/auth', require("./auth"));

const PORT = 4567;
app.listen(PORT, (err) => {
    if(!err) {
        console.log(`Server is working at PORT: ${PORT}`)
    } else {
        console.log('Uh Oh, Something went wrong.')
    }
});