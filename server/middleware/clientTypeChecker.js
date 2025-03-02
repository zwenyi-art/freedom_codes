const clientChecker = (req, res, next) => {
  const userAgent = req.get("User-Agent");
  const acceptHeader = req.get("Accept");
  if (
    userAgent.includes("Chrome") ||
    userAgent.includes("Firefox") ||
    userAgent.includes("Safari")
  ) {
    // res.sendFile(path.join(__dirname,));
    // const home = path.join(__dirname, "../public/index.html");
    res.json({ message: "This is a web client" });
  } else if (userAgent.includes("sing-box") || userAgent.includes("Hiddify")) {
    next();
  } else {
    res.status(400).json({ message: "Unsupported client" });
  }
};
module.exports = { clientChecker };
