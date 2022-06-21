module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define("token", {
        refreshToken: {
            type: Sequelize.TEXT
        }
    });

    return Token;
};