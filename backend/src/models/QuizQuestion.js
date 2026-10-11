const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    options: { type: [String], required: true, validate: v => v.length === 4 },
    correctIndex: { type: Number, required: true, min: 0, max: 3 },
    explanation: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["password-security", "personal-data", "phishing", "social-media", "web-security"],
    },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);