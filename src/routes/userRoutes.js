const {Router} = require("express")
const userRoutes = Router()
const {Apikey} = require("../db")
const {newUser,getUserBySerial, readAllNotification, verifyUser, authUser, putUser, getUsers, getUser, getUserByToken, deleteUser, createTicket, changePassword, createNotification, addHistorial, setResponseTicket, getTickets, generateKey, editUser, createUserByUser} = require("../controllers/userController")
const { sendMail } = require("../helpers/nodeMailer")

userRoutes.get("/", async (req,res) => {
    try{
        const users = await getUsers()
        res.json(users)

    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.post("/mail", async(req,res) => {
    await sendMail("edgarrios412@gmail.com")
    res.json({Hola:"A"})
})

userRoutes.get("/:id", async (req,res) => {
    try{
        const user = await getUser(req.params.id)
        res.json(user)
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.get("/qr/:serial", async (req,res) => {
    try{
        const user = await getUserBySerial(req.params.serial)
        res.json(user)
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.get("/ticket/listar", async (req,res) => {
    try{
        const user = await getTickets()
        res.json(user)
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.put("/ticket/response", async (req,res) => {
    try{
        const user = await setResponseTicket(req.body)
        res.json(user)
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.get("/token/:token", async (req,res) => {
    try{
        const user = await getUserByToken(req.params.token)
        res.json(user)
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.post("/verify", async (req,res) => {
    try{
    const {status,user,token} = await verifyUser(req.body)
    res.json({status:status,user:user, token:token})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.post("/auth", async (req,res) => {
    try{
    const token = await authUser(req.body)
    res.json(token)
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.post("/", async (req,res) => {
    try{
        const user = await newUser(req.body)
        res.json({users:user})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.post("/createByUser", async (req,res) => {
    try {
        if (!req.headers.authorization) {
            return res
              .status(403)
              .send("Tu petición no tiene cabecera de autorización");
          }
          const api = req.headers.authorization.split(" ").at(-1);
          //   const payload = jwt.verify(token, KEY);
          const apiKey = await Apikey.findOne({ where: { key: api } });
          if(!apiKey){
            return res
              .status(403)
              .send("La proporcionada API KEY no es válida");
          }
          if(apiKey.plan == "BASICO" && apiKey.usage+1 > 100){
            return res
              .status(403)
              .send("No puedes superar el límite de QRs adquiridos");
          }
          else if(apiKey.plan == "PROFESIONAL" && apiKey.usage+1 > 1000){
            return res
              .status(403)
              .send("No puedes superar el límite de QRs adquiridos");
          }
          apiKey.usage += 1
          apiKey.save() 
        const user = await createUserByUser(req.body)
        res.json(user)
    } catch (error) {
        res.status(403).json(error.message)
    }
})

userRoutes.post("/ticket", async (req,res) => {
    try{
        const ticket = await createTicket(req.body)
        res.json({response:ticket})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.post("/historial", async (req,res) => {
    try{
        const historial = await addHistorial(req.body)
        res.json({response:historial})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.post("/service/generateKey", async (req,res) => {
    try{
        const key = await generateKey(req.body)
        res.json(key)
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.put("/", async (req,res) => {
    try{
    const edit = await editUser(req.body)
    res.json({users:edit})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.put("/password", async (req,res) => {
    try{
    const edit = await changePassword(req.body)
    res.json({response:edit})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.put("/notificaciones/readAll", async (req,res) => {
    try{
    const edit = await readAllNotification(req.body.userId)
    res.json({response:edit})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.delete("/:id", async (req,res) => {
    try{
    const user = await deleteUser(req.params.id)
    res.json({status:user})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

module.exports = userRoutes