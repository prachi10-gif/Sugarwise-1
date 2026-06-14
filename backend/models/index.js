const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

// Import models
db.User = require('./user')(sequelize, DataTypes);
db.Product = require('./product')(sequelize, DataTypes);
db.Scan = require('./scan')(sequelize, DataTypes);
db.ManualEntry = require('./manual-entry')(sequelize, DataTypes);
db.Conversation = require('./conversation')(sequelize, DataTypes);
db.Message = require('./message')(sequelize, DataTypes);

// Set up associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
