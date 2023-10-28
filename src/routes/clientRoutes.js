const {Router} = require("express")
const clientRoutes = Router()
const {getClientId, getClients, createClient, editClient} = require("../controllers/clientController")

clientRoutes.get("/:id", async (req,res) => {
    const {id} = req.params
    if(id !== "all"){
        try{
        const client = await getClientId(id)
        res.json(client)
        }
        catch(error){
            console.log(error)
        }
    }else{
        try{
        const clients = await getClients()
        res.json(clients)
    }
    catch(error){
        console.log(error)
    }
    }
})

clientRoutes.post("/", async (req,res) => {
    try{
    const newClient = await createClient(req.body)
    res.json({status:newClient})
    }
    catch(error){
        console.log(error)
    }
})

clientRoutes.put("/", async (req,res) => {
    try{
        const response = await editClient(req.body)
        res.json({status:response})
    }catch(error){
        console.log(error)
    }
})

module.exports = clientRoutes