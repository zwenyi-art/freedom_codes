const express = require("express");
const router = express.Router();
const scrapingServers = require("../services/scrapingServers");
const singboxConfigController = require("../controllers/singboxConfigController");
const couponController = require("../controllers/coupnController");
router.get("/update", singboxConfigController.updateRandomServers);
router.get("/scrap", scrapingServers.scrapShadowSocks);
// router.get("/coupon", couponController.createCoupon);
// router.put("/coupon", couponController.updateCoupon);
module.exports = router;
