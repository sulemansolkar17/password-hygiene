const mongoose = require("mongoose");

const awarenessContentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["password-hygiene", "personal-data", "phishing", "social-media", "safe-browsing", "public-wifi"],
    },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    tips: { type: [String], default: [] },
    isPublished: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AwarenessContent", awarenessContentSchema);