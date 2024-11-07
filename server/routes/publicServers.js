const express = require("express");
const router = express.Router();
const scrapingServers = require("../services/scrapingServers");
router.get("/", scrapingServers.scrapShadowSocks);
module.exports = router;
