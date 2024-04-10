const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('historypay', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue:false
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => new Date()
    },
  },{timestamps:false});
};