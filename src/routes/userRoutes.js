const {Router} = require("express")
const userRoutes = Router()
const {newUser, verifyUser, authUser, putUser, getUsers, deleteUser, createTicket, changePassword} = require("../controllers/userController")

userRoutes.get("/", async (req,res) => {
    try{
        const users = await getUsers()
        res.json(users)

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

userRoutes.post("/ticket", async (req,res) => {
    try{
        const ticket = await createTicket(req.body)
        res.json({response:ticket})
    }
    catch(error){
        res.status(403).json(error.message)
    }
})

userRoutes.put("/", async (req,res) => {
    try{
    const edit = await putUser(req.body)
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