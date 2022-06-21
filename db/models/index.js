const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/database.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const User = require("./user")(sequelize, Sequelize);
const Token = require("./token")(sequelize, Sequelize);

User.hasOne(Token, {
  foreignKey: "userId"
});

Token.belongsTo(User, {
  foreignKey: "userId"
});

module.exports = {
  db,
  User,
  Token
};
