const Router = require("express").Router;
const userController = require("../controllers/userController");
const authRouter = require("./authRouter");
const authMiddleware = require("../middlewares/authMiddleware");

const router = new Router();

router.use("/", authRouter);
router.use("/users", authMiddleware, userController.getAll);

module.exports = router;