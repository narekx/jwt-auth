const {User} = require("../db/models");

class UserController {
    async getAll (req, res, next) {
        const users = await User.findAll();
        return res.json(users);
    }
}

module.exports = new UserController();