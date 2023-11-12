const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('client', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departamento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    edad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nacimiento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cara: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ganglios: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    labios: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    atm: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    palpiganglios: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    orejas: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    regio: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    carillas: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    lengua: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    mucosa: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    paladar: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    encia: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    rx: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    laboratorio: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    panoramica: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    modelo: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    coronal: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    tension: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    periapical: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    form: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN), // Definir un array de booleanos
      defaultValue: [],
    },
    especialista: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firma:{
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
    },
    diagrama:{
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
    },
    date:{
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    ulpro:{
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    proxci:{
      type: DataTypes.DATEONLY,
      allowNull: true,
    }
  },{timestamps:false});
};