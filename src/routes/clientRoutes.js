const { Router } = require("express");
const upload = require("../helpers/multer");
const clientRoutes = Router();
const path = require("node:path");
const { createUserLog } = require("../controllers/userLogController");

clientRoutes.get("/test", async (req, res) => {
  // await createUserLog(req, "Ingreso a test");
  res.json({status:true});
});

clientRoutes.post("/test", upload.single("file"), async (req, res) => {
  // await createUserLog(req, "Subio el archivo " + req.file.originalname);
  console.log(req.file)
  // const pdf = await pdfApi.uploadFile("test", req.file.buffer)
  // console.log(pdf)
  res.json(req.file);
});

clientRoutes.get("/files/:filename", async (req, res) => {
  createUserLog(req, "Miro el archivo " + req.params.filename)
  const filepath = path.join(__dirname, "../../uploads", req.params.filename);
  res.sendFile(filepath);
});

module.exports = clientRoutes;
