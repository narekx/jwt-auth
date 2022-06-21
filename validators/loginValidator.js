const { body } = require('express-validator');

const loginValidator = () => {
    return [
        body('email')
            .notEmpty().withMessage("Email can't be empty")
            .isEmail().withMessage("Invalid email"),
        body('password')
            .notEmpty().withMessage("Password can't be empty")
            .isLength({ min: 5 }).withMessage("Password length can't be lower than 5"),
    ]
}

module.exports = loginValidator;