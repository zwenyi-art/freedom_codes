require("dotenv").config();
const express = require("express");
const { connectDb } = require("./configs/dbConn");
const app = express();
const PORT = 4500;
const { serverStatusCheck } = require("./controllers/serversStatusController");
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/bot", require("./routes/telegram_bot"));
app.get("/", async (req, res) => {
  res.send("Hello World!");
});

const start = async () => {
  try {
    await connectDb(process.env.DB_URL);
    app.listen(PORT, () => {
      console.log("server is listening", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
