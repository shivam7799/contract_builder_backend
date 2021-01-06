"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js");
//const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.contractor = require("./contractor.js")(sequelize, Sequelize);
db.backend_user = require("./backend_user.js")(sequelize, Sequelize);
db.countries = require("./country.js")(sequelize, Sequelize);
db.states = require("./state.js")(sequelize, Sequelize);
db.property_type = require("./property_type.js")(sequelize, Sequelize);
db.property_sub_type = require("./propertysubtypes.js")(sequelize, Sequelize);
db.property_owner = require("./propertyowner.js")(sequelize, Sequelize);

module.exports = db;
