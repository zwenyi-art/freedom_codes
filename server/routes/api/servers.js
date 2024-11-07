const express = require("express");
const router = express.Router();
const servers = require("../../controllers/serversController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../configs/role_list");
router.get(
  "/serverList",
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User),
  servers.getRandomServers
);
//can access only admin for a while
router.get(
  "/",
  verifyRoles(ROLES_LIST.Admin),
  servers.getAllServers,
  servers.deleteServer
);
router.post("/", verifyRoles(ROLES_LIST.Admin), servers.createNewServer);
router.delete("/", verifyRoles(ROLES_LIST.Admin), servers.deleteServer);
module.exports = router;
