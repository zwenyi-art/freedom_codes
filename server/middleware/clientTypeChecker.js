const clientChecker = (req, res, next) => {
  const userAgent = req.get("User-Agent");
  const acceptHeader = req.get("Accept");
  console.log(userAgent);
  if (
    userAgent.includes("Chrome") ||
    userAgent.includes("Firefox") ||
    userAgent.includes("Safari")
  ) {
    // res.sendFile(path.join(__dirname,));
    // const home = path.join(__dirname, "../public/index.html");
    res.json({ message: "This is a web client" });
  } else if (userAgent.includes("sing-box")) {
    next();
  } else if (userAgent.includes("Hiddify")) {
    next();
  }
};
module.exports = { clientChecker };
