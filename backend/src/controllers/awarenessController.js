const AwarenessContent = require("../models/AwarenessContent");
const AppError = require("../utils/AppError");

const getAll = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = { isPublished: true };
    if (category) filter.category = category;

    const contents = await AwarenessContent.find(filter).select("-content");
    res.json({ success: true, contents });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const content = await AwarenessContent.findOne({ slug: req.params.slug, isPublished: true });
    if (!content) return next(new AppError("Content not found", 404));
    res.json({ success: true, content });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { title, slug, category, summary, content, tips } = req.body;
    const newContent = await AwarenessContent.create({
      title, slug, category, summary, content, tips,
      createdBy: req.user.userId,
    });
    res.status(201).json({ success: true, content: newContent });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const content = await AwarenessContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!content) return next(new AppError("Content not found", 404));
    res.json({ success: true, content });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const content = await AwarenessContent.findByIdAndDelete(req.params.id);
    if (!content) return next(new AppError("Content not found", 404));
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getOne, create, update, remove };