const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model.js")(sequelize, Sequelize);
db.Assets = require("./assets.model.js")(sequelize, Sequelize);

db.User.hasMany(db.Assets, { foreignKey: 'user_id' });
db.Assets.belongsTo(db.User, { foreignKey: 'user_id' });

db.Finances = require("../models/finances.model.js")(sequelize, Sequelize);
db.User.hasMany(db.Assets, { foreignKey: 'user_id' });
db.Finances.belongsTo(db.User, { foreignKey: 'user_id' });


module.exports = db;