const authService = require("../services/authService");

class AuthController {
    async registration (req, res, next) {
        try {
            const user = await authService.registration(req.body);
            if (user) {
                res.cookie('refreshToken', user.tokens.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true
                });
            }

            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async login (req, res, next) {
        try {
            const user = await authService.login(req.body);
            if (user) {
                res.cookie('refreshToken', user.tokens.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true
                });
            }

            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async activate (req, res, next) {
        try {
            const activationLink = req.params.link;
            const data = await authService.activate(activationLink);

            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async logout (req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            const data = await authService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async refresh (req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            const user = await authService.refresh(refreshToken);
            if (user) {
                res.cookie('refreshToken', user.tokens.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true
                });
            }

            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();