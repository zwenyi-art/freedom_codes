const express = require("express");
const router = express.Router();
const tgBotController = require("../controllers/tgBotController");
router.post("/telegram-webhook", tgBotController.botStarter);
router.get("/postToChannel", tgBotController.postToChannel);
module.exports = router;
