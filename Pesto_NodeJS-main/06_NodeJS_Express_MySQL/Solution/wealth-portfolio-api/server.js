const express = require('express');
const cors = require("cors");
// const assetsRoutes = require('./routes/assets');
// const financesRoutes = require('./routes/finances');
// const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 3000;

var corsOptions = {
    origin: "http://localhost:8081"
  };
  
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


require('./routes/auth.routes')(app);
require('./routes/assets')(app);
require('./routes/finances')(app);

const db = require("./models");
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my Wealth management application." });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
