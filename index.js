const app = require("./src/app")
const {conn} = require("./src/db")
const PORT = 3001 || process.env.PORT

conn.sync({alter:true}).then(() => {
    console.log("Conectado a la base de datos")
    app.listen(PORT, () => {
        console.log("Servidor en linea en el puerto 3001")
    })
})