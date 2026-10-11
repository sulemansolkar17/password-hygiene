const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const { registerSchema, loginSchema } = require("../validators/authValidator");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");

const register = async (req, res, next) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) return next(new AppError(parsed.error.errors[0].message, 400));

    const { name, email, password } = parsed.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new AppError("Email already registered", 409));

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ success: true, message: "Registered successfully", user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return next(new AppError(parsed.error.errors[0].message, 400));

    const { email, password } = parsed.data;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new AppError("Invalid credentials", 401));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new AppError("Invalid credentials", 401));

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, accessToken, user });
  } catch (error) {
    next(error);
  }
};

const refresh = (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return next(new AppError("No refresh token", 401));

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = generateAccessToken(decoded.userId, decoded.role);

    res.json({ success: true, accessToken });
  } catch (error) {
    return next(new AppError("Invalid refresh token", 401));
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ success: true, message: "Logged out successfully" });
};

const getMe = async (req, res, next) => {
  try {
    const User = require("../models/User");
    const user = await User.findById(req.user.userId);
    if (!user) return next(new AppError("User not found", 404));
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, refresh, logout, getMe };