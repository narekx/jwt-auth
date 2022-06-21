const Router = require("express").Router;
const authController = require("../controllers/authController");
const { Token } = require("../db/models/index");
const validate  = require("../validators/validate");
const registrationValidator  = require("../validators/registrationValidator");
const loginValidator  = require("../validators/loginValidator");
const authMiddleware = require("../middlewares/authMiddleware");
const unAuthMiddleware = require("../middlewares/unAuthMiddleware");

const router = new Router();

router.post("/registration", registrationValidator(), validate, unAuthMiddleware, authController.registration);
router.post("/login", loginValidator(), validate,  authController.login);
router.post("/logout", authMiddleware, authController.logout);
router.post("/refresh", authController.refresh);
router.get("/activate/:link", authController.activate);

module.exports = router;