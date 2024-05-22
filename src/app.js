const express = require("express")
const app = express()
const indexRoutes = require("./routes/index")
const cors = require("cors")
const morgan = require("morgan")
const cron = require("node-cron")
const axios = require("axios")

cron.schedule("*/30 * * * * *", () => {
    axios.get("https://gptfree-dv8p.onrender.com/activate").then(() => console.log("Activado"))
})

app.use('/uploads', express.static('uploads'));
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use("/", indexRoutes)

module.exports = app