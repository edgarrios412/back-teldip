const {User} = require("../db")
const jwt = require("jsonwebtoken")

module.exports = {
    authUser: (data) => {
        const res = jwt.verify(data.token,"natalie")
        if(res) return {status:true, user:res}
        return false
    },
}