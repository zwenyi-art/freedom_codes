require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const { connectDb, connectRedis } = require("./configs/dbConn");
const { verifyJWT } = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const { verifyCoin } = require("./middleware/verifyCoin");
const credentials = require("./middleware/credentials");
const cors = require("cors");
const corsOptions = require("./configs/corsOptions");
const app = express();
const PORT = 3500;

//middleware for cookies
app.use(cookieParser());
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
// built-in middleware for json
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({ msg: "I love you.Take care of yourself." });
});
//good cron job
app.use("/crons", require("./routes/cronRouter"));
//authentication
app.use("/auth", require("./routes/auth"));
// app.use("/register", require("./routes/register"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
// api return for singbox and detect with token
app.use("/api/v1", require("./routes/api/singbox_config"));

//api return for client
app.use(verifyJWT);
app.use("/", require("./routes/api/servers"));
app.use("/user", require("./routes/user"));

const start = async () => {
  try {
    await connectDb(process.env.DB_URL);
    await connectRedis();
    app.listen(PORT, () => {
      console.log("server is listening", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
