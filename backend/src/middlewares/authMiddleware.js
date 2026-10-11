const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Not authorized", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError("Token expired or invalid", 401));
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new AppError("Admin access required", 403));
  }
  next();
};

module.exports = { protect, adminOnly };