const { Router } = require("express");
const { createCompany, getCompany } = require("../controllers/companyController");
const companyRoutes = Router();

// companyRoutes.get("/:id", async (req, res) => {
//   res.json({status:true});
// });

companyRoutes.post("/", async (req, res) => {
  try {
    const company = await createCompany(req.body)
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json(error.message)
  }
});

companyRoutes.get("/:id", async (req, res) => {
    try {
      const company = await getCompany(req.params.id)
      res.status(200).json(company);
    } catch (error) {
      res.status(400).json(error.message)
    }
  });

module.exports = companyRoutes;
