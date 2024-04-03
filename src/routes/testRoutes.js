const {Router} = require("express")
const testRoutes = Router()
const { firmarDocumento, verificarFirma } = require("../controllers/firmaController");


// RECIBE X, Y, PAGINA
testRoutes.post("/firmar", async (req,res) => {
    try{
        const {x,y, pagina} = req.body
        const documento = await firmarDocumento(x,y,pagina)
        res.json({response:documento})
    }catch (e){
        res.status(400).json({response:e.message})
    }
})

// RECIBE RUTA
testRoutes.post("/verificarFirma", async (req,res) => {
    try{
        const {ruta} = req.body
        const documento = await verificarFirma(ruta)
        res.json({response:documento})
    }catch (e){
        res.status(400).json({response:e.message})
    }
})

module.exports = testRoutes