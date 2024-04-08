const {Router} = require("express")
const userRoutes = Router()
const {newUser, verifyUser, authUser, putUser, getUsers, deleteUser, createTicket} = require("../controllers/userController")

userRoutes.get("/", async (req,res) => {
    try{
        const users = await getUsers()
        res.json(users)

    }
    catch(error){
        console.log(error)
    }
})

userRoutes.post("/verify", async (req,res) => {
    try{
    const {status,user,token} = await verifyUser(req.body)
    res.json({status:status,user:user, token:token})
    }
    catch(error){
        console.log(error)
    }
})

userRoutes.post("/auth", async (req,res) => {
    try{
    const token = await authUser(req.body)
    res.json({token})
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
        console.log(error)
    }
})

userRoutes.post("/ticket", async (req,res) => {
    try{
        const ticket = await createTicket(req.body)
        res.json({response:ticket})
    }
    catch(error){
        console.log(error)
    }
})

userRoutes.put("/", async (req,res) => {
    try{
    const edit = await putUser(req.body)
    res.json({users:edit})
    }
    catch(error){
        console.log(error)
    }
})

userRoutes.delete("/:id", async (req,res) => {
    try{
    const user = await deleteUser(req.params.id)
    res.json({status:user})
    }
    catch(error){
        console.log(error)
    }
})

module.exports = userRoutes