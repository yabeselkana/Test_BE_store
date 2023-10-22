const express = require("express");
const router = express.Router();
const raksController = require("../controller/reks");

const { protect } = require("../middlewares/auth");

router
  .get("/", raksController.getAllRak)
  .get("/search/", raksController.getSearchRak)
  .get("/:id", raksController.getDetailRak)
  .post("/", raksController.createRak)
  .put("/:id", raksController.updateRak)
  .delete("/:id", raksController.deleteRak);

module.exports = router;
