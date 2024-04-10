const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('notification', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue:false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => new Date()
    },
  },{timestamps:false});
};