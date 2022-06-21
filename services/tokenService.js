const jwt = require("jsonwebtoken");
const {Token} = require("../db/models/index");

class TokenService {
    async createToken (userId, refreshToken, transaction) {
        const token = await Token.create({userId, refreshToken}, {transaction});
        return token;
    }

    generateTokens (payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30m"
        });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "30d"
        });

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken (token) {
        try {
            return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken (token) {
        try {
            return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        } catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService();