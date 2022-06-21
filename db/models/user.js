module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        activationLink: {
            type: Sequelize.STRING
        },
        isActivated: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    });

    return User;
};