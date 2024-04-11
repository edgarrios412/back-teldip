const {Router} = require("express")
const servicesRoutes = Router()
const { generateKey } = require("../controllers/servicesController")


servicesRoutes.post("/generateKey", async (req,res) => {
    const {userId, serviceId} = req.body
    try{
    const key = await generateKey(userId, serviceId)
    res.json(key)
    }
    catch(error){
        console.log(error)
    }
})

module.exports = servicesRoutes