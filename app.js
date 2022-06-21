const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {db, User} = require("./db/models/index");
const router = require("./routes/index");
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api", router);

const start = async () => {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync();
        app.listen(PORT, () => {
           console.log(`Server started on port ${PORT}`);
        });
    } catch (e) {
      console.log(e);
    }
}


start();