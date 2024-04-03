const {Router} = require("express")
const userRoutes = require("./userRoutes")
const clientRoutes = require("./clientRoutes")
const testRoutes = require("./testRoutes")
const { isAuthenticated } = require("../helpers/jwt")
const indexRoutes = Router()

indexRoutes.use("/user", userRoutes)
indexRoutes.use("/test", testRoutes)
indexRoutes.use("/client", clientRoutes)
// indexRoutes.use("/client",isAuthenticated, clientRoutes)

module.exports = indexRoutes