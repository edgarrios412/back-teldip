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
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{timestamps:false});
};