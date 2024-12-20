const express = require("express");
const router = express.Router();
const singboxConfigController = require("../../controllers/singboxConfigController");
const { verifyCoin } = require("../../middleware/verifyCoin");
router.get("/:id", verifyCoin, singboxConfigController.getRandomServers);
// router.get("/:id", singboxConfigController.getRandomServers);
module.exports = router;
