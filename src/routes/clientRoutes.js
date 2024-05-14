const { Router } = require("express");
const clientRoutes = Router();
const path = require("node:path");
const { createUserLog } = require("../controllers/userLogController");

clientRoutes.get("/files/:filename", async (req, res) => {
  createUserLog(req, "Miro el archivo " + req.params.filename)
  const filepath = path.join(__dirname, "../../uploads", req.params.filename);
  res.sendFile(filepath);
});

module.exports = clientRoutes;
