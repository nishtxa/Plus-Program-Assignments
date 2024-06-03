const express = require('express');
const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/weather', weatherRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
