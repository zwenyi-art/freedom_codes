const systemInfo = (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(), // Server uptime in seconds
    timestamp: new Date().toISOString(),
  });
};
module.exports = { systemInfo };
