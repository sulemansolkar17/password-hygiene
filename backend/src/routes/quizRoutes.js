const express = require("express");
const {
  getQuestions, submitAttempt, getHistory,
  createQuestion, updateQuestion, deleteQuestion,
} = require("../controllers/quizController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getQuestions);
router.post("/attempt", protect, submitAttempt);
router.get("/history", protect, getHistory);

router.post("/admin", protect, adminOnly, createQuestion);
router.patch("/admin/:id", protect, adminOnly, updateQuestion);
router.delete("/admin/:id", protect, adminOnly, deleteQuestion);

module.exports = router;