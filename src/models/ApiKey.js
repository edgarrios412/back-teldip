const { DataTypes } = require('sequelize');
const crypto = require("crypto");

const generateApiKey = (length=32) => {
  return crypto.randomBytes(length).toString("hex");
}

module.exports = (sequelize) => {
  sequelize.define('apikey', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue:true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => new Date()
    },
    key: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:() => generateApiKey()
    },
    usage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:0
    },
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    plan:{
      type: DataTypes.ENUM("BASICO","PROFESIONAL","PERSONALIZADO"),
      allowNull: true,
    }
  },{timestamps:false});
};