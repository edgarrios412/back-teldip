const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('ticket', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: new Date()
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    response:{
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },{timestamps:false});
};