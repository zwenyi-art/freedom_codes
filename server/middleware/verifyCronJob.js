const verifyCronJob = (req, res, next) => {
  const api_key = req.headers.authorization?.split(" ")[1];
  if (api_key !== process.env.CRON_TOKEN_SECRET) return res.sendStatus(401);
  next();
};
module.exports = { verifyCronJob };
