const { Company, User } = require("../db");

module.exports = {
  createCompany: async (data) => {
    const user = await User.findByPk(data.owner, {
      include: [
        {
          model: Company,
          as: "micompany",
        },
      ],
    });
    if(user.micompany) throw new Error("Este usuario ya tiene una empresa registrada") 
    await Company.create(data);
    return "Empresa registrada exitosamente";
  },
  getCompany: async (id) => {
    const company = await Company.findByPk(id, {
        include:[{
            model:User
        }]
    })
    return company
  }
};
