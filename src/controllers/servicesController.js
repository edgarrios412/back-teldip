const {Apikey, User} = require("../db")

module.exports = {
    generateKey: async (userId, serviceId) => {
        const user = await User.findByPk(userId)
        if(!user) throw new Error("El usuario no existe")
        const api = await Apikey.create({serviceId})
        user.addApikey(api)
        return api
    },
}