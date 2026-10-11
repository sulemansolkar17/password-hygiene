const express = require("express");
const User = require("../models/User");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/users", protect, adminOnly, async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
});

module.exports = router;