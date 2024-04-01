const {Router} = require("express")
const authRoutes = Router()
const {authUser} = require("../controllers/authController")


authRoutes.post("/verify", async (req,res) => {
    try{
    const {status,user,token} = await verifyUser(req.body)
    res.json({status:status,user:user, token:token})
    }
    catch(error){
        console.log(error)
    }
})

module.exports = authRoutes