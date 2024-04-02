const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { createToken } = require("../helpers/jwt");

module.exports = {
  newUser: async (data) => {
    await User.create(data);
    return "Usuario creado";
  },
  authUser: async (data) => {
    const user = await User.findAll({
      where: {
        email: data.email,
        password: data.password,
      },
    });
    if (!user.length) throw new Error("Las credenciales no son correctas");
    const token = createToken({id:2});
    return token;
  },
  putUser: async (data) => {
    let user;
    if (data.newpass) {
      user = await User.findOne({
        where: {
          id: data.id,
          password: data.oldpass,
        },
      });
    } else {
      user = await User.findOne({
        where: {
          id: data.id,
          // password:data.oldpass
        },
      });
    }
    if (user) {
      user.password = data.newpass;
      user.image = data.image;
      user.save();
      return "Contraseña actualizada";
    }
    return "Contraseña anterior invalida";
  },
  getUsers: async () => {
    const users = await User.findAll();
    return users;
  },
  deleteUser: async (id) => {
    const user = await User.findOne({ where: { id: id } });
    await user.destroy();
    return "Usuario eliminado";
  },
};
