const ApiError = require("../exceptions/ApiError");
const tokenService = require("../services/tokenService");

module.exports = (req, res, next) => {
    try {
        const accessTokenHeader = req.headers.authorization;
        if (!accessTokenHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = accessTokenHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const user = tokenService.validateAccessToken(accessToken);
        if (!user) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = user;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}