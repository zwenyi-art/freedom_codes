const express = require("express");
const router = express.Router();
const verifyCronJob = require("../middleware/verifyCronJob");
const scrapingServers = require("../services/scrapingServers");
const singboxConfigController = require("../controllers/singboxConfigController");
const systemInfoController = require("../controllers/systemInfoController");
const couponController = require("../controllers/coupnController");
router.get(
  "/update",
  verifyCronJob.verifyCronJob,
  singboxConfigController.updateRandomServers
);
router.get(
  "/sysInfo",
  verifyCronJob.verifyCronJob,
  systemInfoController.systemInfo
);
// router.get("/scrap", scrapingServers.scrapShadowSocks);
// router.get("/coupon", couponController.createCoupon);
// router.put("/coupon", couponController.updateCoupon);
module.exports = router;
