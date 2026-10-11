const express = require("express");
const { getAll, getOne, create, update, remove } = require("../controllers/awarenessController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getAll);
router.get("/:slug", getOne);

router.post("/", protect, adminOnly, create);
router.patch("/:id", protect, adminOnly, update);
router.delete("/:id", protect, adminOnly, remove);

module.exports = router;