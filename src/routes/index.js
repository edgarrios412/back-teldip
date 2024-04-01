const {Router} = require("express")
const userRoutes = require("./userRoutes")
const clientRoutes = require("./clientRoutes")
const { isAuthenticated } = require("../helpers/jwt")
const indexRoutes = Router()

indexRoutes.use("/user", userRoutes)
indexRoutes.use("/client",isAuthenticated, clientRoutes)

module.exports = indexRoutes