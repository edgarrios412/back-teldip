const { Router } = require("express");
const {Apikey} = require("../db")
const upload = require("../helpers/multer");
const { excelToJson } = require("../helpers/excel");
const { newUser, bulkCreateUser } = require("../controllers/userController");
const fileRoutes = Router();

fileRoutes.post("/excelToJson", upload.single("file"), async (req, res) => {
    try {
      const jsonFile = excelToJson(req.file.path);
      res.status(200).json(jsonFile);
    } catch (e) {
      res.status(400).json(e.message);
    }
});

fileRoutes.post("/image/upload", upload.single("file"), async (req, res) => {
  try {
    res.status(200).json(req.file.path);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

fileRoutes.get("/image/:path", async (req, res) => {
  try {
      res.sendFile("C:\\Users\\User\\Desktop\\back-teldip\\uploads\\"+req.params.path);
  } catch (error) {
    res.status(400).json(error.message)
  }
})

fileRoutes.post("/excelToJson/createUsers", upload.single("file"), async (req, res) => {
  try {
    const jsonFile = excelToJson(req.file.path);
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
      if(apiKey.plan == "BASICO" && apiKey.usage+jsonFile.length > 100){
        return res
          .status(403)
          .send("No puedes superar el límite de QRs adquiridos");
      }
      else if(apiKey.plan == "PROFESIONAL" && apiKey.usage+jsonFile.length > 1000){
        return res
          .status(403)
          .send("No puedes superar el límite de QRs adquiridos");
      }
      apiKey.usage += jsonFile.length
      apiKey.save() 
      
    const usuarios = await bulkCreateUser(jsonFile);
    res.status(200).json(usuarios);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

module.exports = fileRoutes;
