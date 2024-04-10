const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('userlog', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: () => new Date()
    },
    accion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{timestamps:false});
};