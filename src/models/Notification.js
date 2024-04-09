const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('notification', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    from: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date()
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },{timestamps:false});
};