const app = require("./src/app")
const {conn} = require("./src/db")
const PORT = process.env.PORT || 3001;
var cron = require('node-cron');
const { sendMail } = require("./src/helpers/nodeMailer");

// cron.schedule('* * 12 * * *', () => {
//     // VERIFICAR LOS CORREOS CON CUENTA FREE Y ENVIARLES
//     // UN CORREO CUANDO SE USEN LOS 14 DIAS GRATUITOS 
// //   sendMail("edgarrios412@gmail.com")
// });

conn.sync({alter:true}).then(() => {
    console.log("Conectado a la base de datos")
    app.listen(PORT, () => {
        console.log("Servidor en linea en el puerto "+PORT)
    })
}, (e) => console.log("Ha ocurrido un error al sincronizar la base de datos: ",e))