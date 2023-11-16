const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('cotizacion', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    proced: {
      type: DataTypes.ARRAY,
      allowNull: true,
    }
  },{timestamps:false});
};