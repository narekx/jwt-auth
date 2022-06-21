const ApiError = require("../exceptions/ApiError");

module.exports = (error, req, res, next) => {
    console.log(error);
    if (error instanceof ApiError) {
        return res.status(res.status).json({message: error.message});
    }

    return res.status(500).json({message: "Unsupported error"});
}