const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('company', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nit:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    owner:{
        type:DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Nombre de la tabla de Usuario
          key: 'id'
        }
    },
    createdDate:{
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => new Date()
    }
  },{timestamps:false});
};