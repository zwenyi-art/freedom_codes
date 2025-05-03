const express = require("express");
const router = express.Router();
const singboxConfigController = require("../../controllers/singboxConfigController");
const { clientChecker } = require("../../middleware/clientTypeChecker");
const { verifyCoin } = require("../../middleware/verifyCoin");
// router.get("/:id", verifyCoin, singboxConfigController.getRandomServers);
// router.get("/:id", clientChecker, singboxConfigController.getRandomServers);
// router.get("/:id", singboxConfigController.getRandomSingboxServers);
// router.get(
//   "/:id",
//   clientChecker,
//   singboxConfigController.getRandomSingboxServers
// );

router.post("/generateServers", singboxConfigController.generateRandomServers);

router.get("/:id", singboxConfigController.getUserServerConfigure);
// router.get(
//   "/:id",
//   clientChecker,
//   singboxConfigController.getRandomHiddifyServers
// );
module.exports = router;
