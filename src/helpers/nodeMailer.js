const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "edgarrios412@gmail.com",
    pass: "rlvm ndcq dmwn knla",
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = {
    sendMail: async (email) => {
        const info = await transporter.sendMail({
          from: '"Soporte TELDIP 👻" <support@teldip.com>', // sender address
          to: email, // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Hello world?</b>", // html body
        });
        console.log("Message sent: %s", info.messageId);
    },
    sendMailQRCode: async (user) => {
      const info = await transporter.sendMail({
        from: '"Soporte TELDIP 👻" <support@teldip.com>', // sender address
        to: user.email, // list of receivers
        subject: "Te han generado una tarjeta de identificación", // Subject line
        html: `<b>Hola ${user.name}</b><br></br>
        <b>Esta es tu tarjeta de identificación</b><br></br>
        <a href="https://teldip.com/qr/${user.serial}">Ver mi tarjeta</a>
        `, // html body
      });
      console.log("Message sent: %s", info.messageId);
  }
}