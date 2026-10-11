const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes");
const awarenessRoutes = require("./routes/awarenessRoutes");
const quizRoutes = require("./routes/quizRoutes");
const adminRoutes = require("./routes/adminRoutes");
dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.json({ message: "Password Hygiene API running" }));

app.use("/api/auth", authRoutes);
app.use("/api/awareness", awarenessRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

module.exports = app;