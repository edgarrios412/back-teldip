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
      set(value) {
        this.setDataValue('nombre', value.trim().toUpperCase());
      },
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
      set(value) {
        this.setDataValue('direccion', value.trim().toUpperCase());
      },
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