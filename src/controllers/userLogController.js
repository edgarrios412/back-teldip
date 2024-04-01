const {Userlog, User} = require("../db")

module.exports = {
    createUserLog: async (req, accion) => {
        const log = await Userlog.create({accion:accion})
        const user = await User.findByPk(req.userId)
        await user.addUserlog(log)
    },

}