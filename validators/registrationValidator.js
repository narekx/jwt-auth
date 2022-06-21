const { body } = require('express-validator');

const registrationValidator = () => {
    return [
        body('firstName')
            .notEmpty().withMessage("First name can't be empty")
            .isLength({ max: 30 }).withMessage("First name length can't be longer than 30"),
        body('lastName')
            .notEmpty().withMessage("Last name can't be empty")
            .isLength({ max: 30 }).withMessage("Last name length can't be longer than 30"),
        body('email')
            .notEmpty().withMessage("Email can't be empty")
            .isEmail().withMessage("Invalid email"),
        body('password')
            .notEmpty().withMessage("Password can't be empty")
            .isLength({ min: 5 }).withMessage("Password length can't be lower than 5"),
    ]
}

module.exports = registrationValidator;