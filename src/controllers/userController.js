const { User, Ticket, Userlog } = require("../db");
const jwt = require("jsonwebtoken");
const { createToken } = require("../helpers/jwt");
const { encryptPassword, verifyPassword } = require("../helpers/encryptPassword");

module.exports = {
  newUser: async (data) => {
    const passwordEncripted = encryptPassword(data.password)
    await User.create({...data, password:passwordEncripted});
    return "Usuario creado exitosamente";
  },
  authUser: async (data) => {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (!verifyPassword(data.password,user.password)) throw new Error("Las credenciales no son correctas");
    const token = createToken({id:user.id});
    const log = await Userlog.create({accion:`El usuario ha ingresado a la plataforma`})
    await user.addUserlog(log)
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
  createTicket: async (body) => {
    const ticket = await Ticket.create({message:body.message})
    const user = await User.findByPk(body.userId)
    user.addTicket(ticket)
    return "Ticket creado exitosamente"
  }
};
