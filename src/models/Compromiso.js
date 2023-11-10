const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('compromiso', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    firmado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    }
  },{timestamps:false});
};