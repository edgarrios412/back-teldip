const {
  User,
  Ticket,
  Userlog,
  Notification,
  Historypay,
  Apikey,
} = require("../db");
const jwt = require("jsonwebtoken");
const { createToken, decodeToken } = require("../helpers/jwt");
const { v4: uuidv4 } = require("uuid");
const {
  encryptPassword,
  verifyPassword,
} = require("../helpers/encryptPassword");
const { sendMailQRCode } = require("../helpers/nodeMailer");

module.exports = {
  newUser: async (data) => {
    const existMail = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (existMail) throw new Error("El correo electronico ingresado ya existe");
    const passwordEncripted = encryptPassword(data.password);
    await User.create({ ...data, password: passwordEncripted });
    return "Usuario creado exitosamente";
  },
  bulkCreateUser: async (userArray) => {
    for (let i = 0; i < userArray.length; i++) {
      const existMail = await User.findOne({
        where: {
          email: userArray[i].correo,
        },
      });
      if (existMail)
        throw new Error(
          "El correo electronico ingresado ya existe: " + userArray[i].correo
        );
    }
    const usuarios = userArray.map((u) => {
      return {
        name: u.nombres,
        lastname: u.apellidos,
        email: u.correo,
        password: encryptPassword(u.clave.toString()),
        phone: u.telefono,
        serial: uuidv4(),
      };
    });
    await User.bulkCreate(usuarios);
    for (let i = 0; i < usuarios.length; i++) {
      sendMailQRCode(usuarios[i]);
      console.log(usuarios[i]);
    }
    return "Usuarios creados exitosamente";
  },
  createNotification: async (body) => {
    const notification = await Notification.create(body);
    const user = await User.findByPk(body.userId);
    user.addNotification(notification);
    return "Notificacion creada exitosamente";
  },
  generateKey: async ({ userId, serviceId, plan }) => {
    const user = await User.findByPk(userId, { include: [{ model: Apikey }] });
    if (!user) throw new Error("El usuario no existe");
    if (user.apikeys.filter((a) => a.serviceId == serviceId).length)
      throw new Error(
        "Ya tienes un servicio contratado, contacta a soporte para actualizar tu plan"
      );
    const api = await Apikey.create({ serviceId, plan });
    user.addApikey(api);
    return api;
  },
  getUser: async (id) => {
    const user = await User.findByPk(id, {
      include: [
        {
          model: Historypay, // Asegúrate de importar el modelo de notificación
        },
        {
          model: Notification, // Asegúrate de importar el modelo de notificación
        },
        {
          model: Apikey, // Asegúrate de importar el modelo de notificación
        },
      ],
    });
    if (!user) throw new Error("El usuario buscado no existe");
    return user;
  },
  getUserByToken: async (token) => {
    const { id } = jwt.verify(token, "test");
    const user = await User.findByPk(id, {
      include: [
        {
          model: Historypay, // Asegúrate de importar el modelo de notificación
        },
        {
          model: Ticket, // Asegúrate de importar el modelo de notificación
        },
        {
          model: Notification, // Asegúrate de importar el modelo de notificación
        },
        {
          model: Apikey, // Asegúrate de importar el modelo de notificación
        },
      ],
    });
    if (!user) throw new Error("El usuario buscado no existe");
    return user;
  },
  authUser: async (data) => {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
      include: [
        {
          model: Historypay, // Asegúrate de importar el modelo de Historypay
        },
        {
          model: Ticket, // Asegúrate de importar el modelo de notificación
        },
        {
          model: Notification, // Asegúrate de importar el modelo de notificación
        },
        {
          model: Apikey, // Asegúrate de importar el modelo de notificación
        },
      ],
    });
    if (!user) throw new Error("Las credenciales no son correctas");
    if (!verifyPassword(data.password, user.password))
      throw new Error("Las credenciales no son correctas");
    const token = createToken({ id: user.id });
    const log = await Userlog.create({
      accion: `El usuario ha ingresado a la plataforma`,
    });
    await user.addUserlog(log);
    return { user, token };
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
  changePassword: async (data) => {
    const user = await User.findByPk(data.userId);
    if (verifyPassword(data.password, user.password)) {
      const passwordEncripted = encryptPassword(data.newpassword);
      user.password = passwordEncripted;
      user.save();
      return "Contraseña actualizada exitosamente";
    } else throw new Error("La contraseña anterior es incorrecta");
  },
  getUsers: async () => {
    const users = await User.findAll();
    return users;
  },
  getTickets: async () => {
    const ticket = await Ticket.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    return ticket;
  },
  getTicketById: async (id) => {
    const ticket = await Ticket.findByPk(id);
    return ticket;
  },
  setResponseTicket: async (body) => {
    const ticket = await Ticket.findByPk(body.id);
    if (!ticket) throw new Error("No existe ese ticket");
    ticket.response = body.response;
    ticket.responseDate = new Date();
    ticket.save();
    const notification = await Notification.create({
      message: "Tu ticket ha sido respondido",
    });
    const user = await User.findByPk(ticket.userId);
    user.addNotification(notification);
    return ticket;
  },
  deleteUser: async (id) => {
    const user = await User.findOne({ where: { id: id } });
    await user.destroy();
    return "Usuario eliminado";
  },
  createTicket: async (body) => {
    const ticket = await Ticket.create({ message: body.message });
    const user = await User.findByPk(body.userId);
    user.addTicket(ticket);
    return "Ticket creado exitosamente";
  },
  addHistorial: async (body) => {
    const historypay = await Historypay.create(body);
    const user = await User.findByPk(body.userId);
    if (body.status) {
      user.balance = Number(user.balance) + Number(body.amount);
      user.save();
    }
    user.addHistorypay(historypay);
    return "Historial agregado exitosamente";
  },
  getUserBySerial: async (serial) => {
    const user = await User.findOne({ where: { serial } });
    if (!user) throw new Error("El usuario buscado no existe");
    return user;
  },
  readAllNotification: async (userId) => {
    const notifications = await Notification.findAll({
      where: { userId: userId },
    });
    for (let i = 0; i < notifications.length; i++) {
      notifications[i].read = true;
      notifications[i].save();
    }
    return "Todas las notificaciones fueron marcadas como leidas";
  },
  editUser: async (data) => {
    const user = await User.findOne({
      where: {
        id: data.id,
      },
    });
    if (user) {
      for (const key in data) {
        user[key] = data[key];
      }
      await user.save();
      return user;
    } else return "No encontramos el usuario";
  },
};
