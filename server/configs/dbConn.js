const mongoose = require("mongoose");
const { createClient } = require("redis");
mongoose.connection.on("connected", () => console.log("connected"));
mongoose.connection.on("open", () => console.log("open"));
mongoose.connection.on("connecting", () => console.log("connecting"));
mongoose.connection.on("disconnected", () => console.log("disconnected"));
mongoose.connection.on("disconnected", () => console.log("disconnected"));

const client = createClient({
  username: "default",
  password: "gYzlcFnJXfSmfBlkInnUQH8PUNHGbHVM",
  socket: {
    host: "redis-12519.c334.asia-southeast2-1.gce.redns.redis-cloud.com",
    port: 12519,
  },
});
const connectRedis = async () => {
  return client
    .connect()
    .then(() => {
      console.log("Connected to Redis");
    })
    .catch((err) => console.error(err));
};

const connectDb = async (URL) => {
  return mongoose
    .connect(URL)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => console.error(err));
};

module.exports = { connectDb, connectRedis,client };
