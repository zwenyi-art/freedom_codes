const express = require("express");
const router = express.Router();
const tgBotController = require("../controllers/tgBotController");
const serverController = require("../controllers/serversStatusController");
router.post("/telegram-webhook", tgBotController.botStarter);
router.get("/postToChannel", tgBotController.postToChannel);
router.get("/msgEdit", tgBotController.editMessage);
// router.get("/serverStatus", serverController.getAllServersStatus);

module.exports = router;
