const ApiError = require("../exceptions/ApiError");

module.exports = (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
           return next(ApiError.BadRequest("You are registered"));
        }

        next();
    } catch (e) {
        return next(e);
    }
}