import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const categories = [
  { key: "password-security", label: "Password Security", icon: "🔐", color: "from-cyan-500/10 to-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40" },
  { key: "personal-data", label: "Personal Data", icon: "🗄️", color: "from-violet-500/10 to-violet-500/5 border-violet-500/20 hover:border-violet-500/40" },
  { key: "phishing", label: "Phishing", icon: "🎣", color: "from-rose-500/10 to-rose-500/5 border-rose-500/20 hover:border-rose-500/40" },
  { key: "social-media", label: "Social Media", icon: "📱", color: "from-amber-500/10 to-amber-500/5 border-amber-500/20 hover:border-amber-500/40" },
  { key: "web-security", label: "Web Security", icon: "🌐", color: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40" },
];

const Quiz = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [phase, setPhase] = useState("select");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const startQuiz = async (category) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/quizzes?category=${category.key}`);
      const qs = res.data.questions;
      if (!qs.length) {
        setError("No questions available for this category yet.");
        setLoading(false);
        return;
      }
      setSelectedCategory(category);
      setQuestions(qs);
      setAnswers([]);
      setCurrentIndex(0);
      setSelected(null);
      setResult(null);
      setPhase("quiz");
    } catch {
      setError("Failed to load questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);
  };

  const handleNext = () => {
    const updatedAnswers = [...answers, selected];
    setAnswers(updatedAnswers);
    setSelected(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      submitQuiz(updatedAnswers);
    }
  };

    const submitQuiz = async (finalAnswers) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setSubmitting(true);
    try {
      const paddedAnswers = questions.map((_, i) =>
        finalAnswers[i] !== undefined ? finalAnswers[i] : null
      );
      const res = await api.post("/quizzes/attempt", {
        category: selectedCategory.key,
        answers: paddedAnswers,
      });
      setResult(res.data);
      setPhase("result");
    } catch {
      setError("Failed to submit quiz. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setPhase("select");
    setSelectedCategory(null);
    setQuestions([]);
    setAnswers([]);
    setCurrentIndex(0);
    setSelected(null);
    setResult(null);
    setError("");
  };

  const current = questions[currentIndex];
  const progress = questions.length ? ((currentIndex) / questions.length) * 100 : 0;

  if (phase === "select") {
    return (
      <div className="min-h-screen bg-gray-950 text-white px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium px-4 py-2 rounded-full mb-5">
              📋 Security Quiz
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Test Your Security Knowledge</h1>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Choose a category and test what you know. Results are saved to your dashboard.
            </p>
            {!user && (
              <div className="mt-4 inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs px-4 py-2 rounded-full">
                ⚠ Login to save your quiz results
              </div>
            )}
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-3 rounded-xl mb-6 text-center">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => startQuiz(cat)}
                disabled={loading}
                className={`group bg-gradient-to-br ${cat.color} border rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
              >
                <span className="text-3xl block mb-4">{cat.icon}</span>
                <h3 className="text-white font-semibold text-lg mb-1">{cat.label}</h3>
                <p className="text-gray-500 text-sm">
                  Test your {cat.label.toLowerCase()} knowledge
                </p>
                <div className="mt-4 text-cyan-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Start Quiz <span>→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

    if (phase === "quiz") {
    return (
      <div className="min-h-screen bg-gray-950 text-white px-4 py-12">
        <div className="max-w-2xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedCategory.icon}</span>
              <div>
                <p className="text-white font-semibold text-sm">{selectedCategory.label}</p>
                <p className="text-gray-500 text-xs">
                  Question {currentIndex + 1} of {questions.length}
                </p>
              </div>
            </div>
            <button
              onClick={reset}
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              ✕ Exit
            </button>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-1.5 mb-8">
            <div
              className="h-1.5 rounded-full bg-cyan-500 transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 mb-6">
            <p className="text-white font-medium text-lg leading-relaxed mb-8">
              {current?.question}
            </p>

            <div className="space-y-3">
              {current?.options.map((opt, i) => {
                let style = "bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600 cursor-pointer";
                if (answers[currentIndex] === i) style = "bg-cyan-500/10 border-cyan-500/40 text-cyan-300 cursor-pointer";
                return (
                  <button
                    key={i}
                    onClick={() => {
                      const updated = [...answers];
                      updated[currentIndex] = i;
                      setAnswers(updated);
                    }}
                    className={`w-full text-left px-5 py-4 rounded-xl border text-sm transition-all ${style}`}
                  >
                    <span className="text-gray-600 mr-3 font-medium">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setCurrentIndex(currentIndex - 1);
              }}
              disabled={currentIndex === 0}
              className="flex-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl text-sm transition-colors"
            >
              ← Previous
            </button>

            {currentIndex + 1 < questions.length ? (
              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold py-3.5 rounded-xl text-sm transition-colors"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => submitQuiz(answers)}
                disabled={submitting}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-950 font-bold py-3.5 rounded-xl text-sm transition-colors"
              >
                {submitting ? "Submitting..." : "Submit Quiz ✓"}
              </button>
            )}
          </div>

          <button
            onClick={() => submitQuiz(answers)}
            disabled={submitting}
            className="w-full mt-3 bg-gray-800/50 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-700 text-gray-400 hover:text-white font-medium py-2.5 rounded-xl text-xs transition-colors"
          >
            {submitting ? "Submitting..." : "Submit Now — End Quiz Early"}
          </button>

          {error && (
            <p className="text-rose-400 text-sm text-center mt-4">{error}</p>
          )}

        </div>
      </div>
    );
  }

  if (phase === "result") {
    const scoreColor =
      result.score >= 75
        ? "text-emerald-400"
        : result.score >= 50
        ? "text-amber-400"
        : "text-rose-400";

    const scoreBg =
      result.score >= 75
        ? "bg-emerald-500/10 border-emerald-500/20"
        : result.score >= 50
        ? "bg-amber-500/10 border-amber-500/20"
        : "bg-rose-500/10 border-rose-500/20";

    const scoreMessage =
      result.score === 100
        ? "Perfect Score! 🎉"
        : result.score >= 75
        ? "Great job! Keep it up."
        : result.score >= 50
        ? "Not bad. Review the explanations."
        : "Needs improvement. Study the module.";

    return (
      <div className="min-h-screen bg-gray-950 text-white px-4 py-12">
        <div className="max-w-2xl mx-auto">

          <div className={`${scoreBg} border rounded-2xl p-8 text-center mb-8`}>
            <p className="text-gray-400 text-sm mb-2">{selectedCategory.label} Quiz</p>
            <div className={`text-6xl font-bold ${scoreColor} mb-2`}>
              {result.score}%
            </div>
            <p className="text-gray-400 text-sm mb-1">
              {result.correctAnswers} out of {result.totalQuestions} correct
            </p>
            <p className={`font-semibold text-sm mt-3 ${scoreColor}`}>
              {scoreMessage}
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
            <h2 className="text-white font-semibold mb-6">Answer Review</h2>
            <div className="space-y-5">
              {result.results.map((r, i) => (
                <div key={i} className="border-b border-gray-800 last:border-0 pb-5 last:pb-0">
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${r.isCorrect ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                      {r.isCorrect ? "✓" : "✕"}
                    </span>
                    <p className="text-gray-300 text-sm leading-relaxed">{r.question}</p>
                  </div>

                  <div className="ml-9 space-y-2">
                    {questions[i]?.options.map((opt, oi) => {
                      let style = "text-gray-600";
                      if (oi === r.correctIndex) style = "text-emerald-400 font-medium";
                      else if (oi === r.selected && !r.isCorrect) style = "text-rose-400 line-through";
                      return (
                        <p key={oi} className={`text-xs ${style}`}>
                          {String.fromCharCode(65 + oi)}. {opt}
                        </p>
                      );
                    })}

                    <div className="mt-3 p-3 bg-sky-500/5 border border-sky-500/10 rounded-xl">
                      <p className="text-sky-400 text-xs font-semibold mb-1">Explanation</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{r.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
            >
              Try Another Category
            </button>
            <button
              onClick={() => startQuiz(selectedCategory)}
              className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold py-3 rounded-xl text-sm transition-colors"
            >
              Retry This Quiz
            </button>
          </div>

        </div>
      </div>
    );
  }
};

export default Quiz;