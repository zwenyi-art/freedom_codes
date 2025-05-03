const { client } = require("../configs/dbConn");
const cacheMiddleware = async (req, res, next) => {
  const { userId } = req.body;
  console.log("Cache Middleware");
  if (!userId)
    return res.status(400).json({ error: "Missing userId from middleware" });
  try {
    const cache = await client.get(`userId:${userId}`);
    if (cache) {
      const data = JSON.parse(cache);
      return res.status(200).json({ msg: true, data });
    }
    next();
  } catch (error) {
    console.error("Cache error", err);
    next();
  }
};

const cacheGenerator = async (req, res, next) => {
  const userId = Number(req.user_id);
  console.log("Cache Middleware");
  if (!userId)
    return res.status(400).json({ error: "Missing userId from middleware" });
  try {
    const cache = await client.get(`userId:${userId}`);
    if (cache) {
      const data = JSON.parse(cache);
      return res.status(200).json({ data });
    } else {
      console.log("Cache miss, generating new cache", userId);
      next();
    }
  } catch (error) {
    console.error("Cache error", err);
    next();
  }
};
module.exports = { cacheMiddleware, cacheGenerator };
