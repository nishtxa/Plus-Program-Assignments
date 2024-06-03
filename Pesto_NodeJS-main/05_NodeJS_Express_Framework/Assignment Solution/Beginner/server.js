const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 8000;

//Allows public folder to be unblocked
app.use(express.static('public'))
app.use(express.json())

app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

// Middleware for logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware for 404 errors
app.use((req, res) => {
    res.status(404).send('404: Page not found');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
