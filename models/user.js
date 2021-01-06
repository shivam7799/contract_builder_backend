"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Contractor);
      User.hasMany(models.Backend_User);
      User.hasMany(models.PropertyOwner);
    }
  }
  User.init(
    {
      user_type: DataTypes.STRING,
      email: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
      updated_by: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false
    }
  );
  return User;
};
