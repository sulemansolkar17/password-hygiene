const QuizQuestion = require("../models/QuizQuestion");
const QuizAttempt = require("../models/QuizAttempt");
const AppError = require("../utils/AppError");

const getQuestions = async (req, res, next) => {
  try {
    const { category, difficulty } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await QuizQuestion.find(filter).select("-correctIndex -explanation");
    res.json({ success: true, questions });
  } catch (error) {
    next(error);
  }
};

const submitAttempt = async (req, res, next) => {
  try {
    const { category, answers } = req.body;

    if (!category || !Array.isArray(answers)) {
      return next(new AppError("category and answers required", 400));
    }

    const questions = await QuizQuestion.find({ category });
    if (!questions.length) return next(new AppError("No questions found", 404));

    let correctAnswers = 0;
    const results = questions.map((q, i) => {
      const isCorrect = answers[i] !== null && answers[i] === q.correctIndex;
      if (isCorrect) correctAnswers++;
      return {
        question: q.question,
        selected: answers[i],
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        isCorrect,
      };
    });

    const score = Math.round((correctAnswers / questions.length) * 100);

    const attempt = await QuizAttempt.create({
      user: req.user.userId,
      category,
      totalQuestions: questions.length,
      correctAnswers,
      score,
    });

    res.json({ success: true, score, correctAnswers, totalQuestions: questions.length, results, attempt });
  } catch (error) {
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const attempts = await QuizAttempt.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json({ success: true, attempts });
  } catch (error) {
    next(error);
  }
};

const createQuestion = async (req, res, next) => {
  try {
    const { question, options, correctIndex, explanation, category, difficulty } = req.body;
    const newQuestion = await QuizQuestion.create({ question, options, correctIndex, explanation, category, difficulty });
    res.status(201).json({ success: true, question: newQuestion });
  } catch (error) {
    next(error);
  }
};

const updateQuestion = async (req, res, next) => {
  try {
    const question = await QuizQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) return next(new AppError("Question not found", 404));
    res.json({ success: true, question });
  } catch (error) {
    next(error);
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    const question = await QuizQuestion.findByIdAndDelete(req.params.id);
    if (!question) return next(new AppError("Question not found", 404));
    res.json({ success: true, message: "Question deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getQuestions, submitAttempt, getHistory, createQuestion, updateQuestion, deleteQuestion };