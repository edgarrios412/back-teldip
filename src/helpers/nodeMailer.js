const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "edgarrios412@gmail.com",
    pass: "rlvm ndcq dmwn knla",
  },
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
    }
}