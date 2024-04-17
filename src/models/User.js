const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    serial: {
      type: DataTypes.UUID,
      defaultValue: null,
      allowNull: true,
   },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:1,
    },
    phone:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    documento: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    certificacion:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue('name', value.trim().toUpperCase());
      },
    },
    lastname:{
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue('lastname', value.trim().toUpperCase());
      },
    },
    email:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    balance:{
      type:DataTypes.BIGINT,
      allowNull:false,
      defaultValue:0
    },
    password:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdDate:{
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => new Date()
    }
  },{timestamps:false});
};