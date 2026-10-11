import { useEffect, useState } from "react";
import api from "../../services/api";

const emptyForm = {
  question: "",
  options: ["", "", "", ""],
  correctIndex: 0,
  explanation: "",
  category: "password-security",
  difficulty: "easy",
};

const categories = ["password-security", "personal-data", "phishing", "social-media", "web-security"];
const difficulties = ["easy", "medium", "hard"];

const AdminQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchQuestions = async () => {
    try {
      const res = await api.get("/quizzes");
      setQuestions(res.data.questions);
    } catch {
      setError("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuestions(); }, []);

  const handleOptionChange = (i, val) => {
    const updated = [...form.options];
    updated[i] = val;
    setForm({ ...form, options: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      if (editId) {
        await api.patch(`/quizzes/admin/${editId}`, form);
        setSuccess("Question updated.");
      } else {
        await api.post("/quizzes/admin", form);
        setSuccess("Question created.");
      }
      setForm(emptyForm);
      setEditId(null);
      fetchQuestions();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (q) => {
    setForm({
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex ?? 0,
      explanation: q.explanation,
      category: q.category,
      difficulty: q.difficulty,
    });
    setEditId(q._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    try {
      await api.delete(`/quizzes/admin/${id}`);
      setSuccess("Question deleted.");
      fetchQuestions();
    } catch {
      setError("Failed to delete.");
    }
  };

  const filtered = filter === "all" ? questions : questions.filter((q) => q.category === filter);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Quiz Questions</h1>
        <p className="text-gray-500 text-sm">Create and manage quiz questions by category.</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
        <h2 className="text-white font-semibold mb-5">
          {editId ? "Edit Question" : "Add New Question"}
        </h2>

        {error && <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}
        {success && <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm px-4 py-3 rounded-xl mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Question</label>
            <textarea
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              rows={2}
              required
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 resize-none"
              placeholder="Enter the question..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-500 block">Options (select correct answer)</label>
            {form.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, correctIndex: i })}
                  className={`w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors ${
                    form.correctIndex === i
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-gray-600 hover:border-gray-400"
                  }`}
                >
                  {form.correctIndex === i && <span className="text-white text-xs font-bold">✓</span>}
                </button>
                <input
                  value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  required
                  placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  className="flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            ))}
            <p className="text-gray-600 text-xs">Click the circle next to the correct answer.</p>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Explanation (shown after quiz)</label>
            <textarea
              value={form.explanation}
              onChange={(e) => setForm({ ...form, explanation: e.target.value })}
              rows={2}
              required
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 resize-none"
              placeholder="Explain why the correct answer is right..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Difficulty</label>
              <select
                value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-gray-950 font-bold py-3 rounded-xl text-sm transition-colors"
            >
              {saving ? "Saving..." : editId ? "Update Question" : "Add Question"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => { setForm(emptyForm); setEditId(null); }}
                className="px-6 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-sm transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-white font-semibold">
            All Questions <span className="text-gray-600 font-normal text-sm">({filtered.length})</span>
          </h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2 text-sm focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-600 text-sm">
            No questions found. Add one above.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((q) => (
              <div key={q._id} className="bg-gray-800/50 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium mb-2 leading-relaxed">{q.question}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-700 text-gray-400 px-2.5 py-1 rounded-full">{q.category}</span>
                      <span className={`text-xs px-2.5 py-1 rounded-full ${
                        q.difficulty === "easy" ? "bg-emerald-500/10 text-emerald-400"
                        : q.difficulty === "medium" ? "bg-amber-500/10 text-amber-400"
                        : "bg-rose-500/10 text-rose-400"
                      }`}>{q.difficulty}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(q)}
                      className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(q._id)}
                      className="text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminQuestions;