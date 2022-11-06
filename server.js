const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();
const port = 3001;
mongoose.connect(
    "mongodb://localhost:27017/ototd",
    { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));
app.use(express.json());

const userRouter = require("./routes/users");
app.use(cors());
app.options("*", cors());
app.use("/users", userRouter);
app.listen(process.env.PORT || port, () => console.log(`Server Started on port :${port}`));

module.exports = app;