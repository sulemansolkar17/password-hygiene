import { useEffect, useState, useRef } from "react";
import api from "../../services/api";

const emptyForm = {
  title: "",
  slug: "",
  category: "password-hygiene",
  summary: "",
  content: "",
  tips: "",
  isPublished: true,
};

const categories = [
  "password-hygiene",
  "personal-data",
  "phishing",
  "social-media",
  "safe-browsing",
  "public-wifi",
];

const AdminContent = () => {
  const [contents, setContents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchContents = async () => {
    try {
      const res = await api.get("/awareness");
      setContents(res.data.contents);
    } catch {
      setError("Failed to load content.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContents(); }, []);

  const generateSlug = (title) =>
    title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (val) => {
  setForm((prev) => ({
    ...prev,
    title: val,
    slug: generateSlug(val),
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      tips: form.tips ? form.tips.split("\n").map((t) => t.trim()).filter(Boolean) : [],
    };

    try {
      if (editId) {
        await api.patch(`/awareness/${editId}`, payload);
        setSuccess("Content updated successfully.");
      } else {
        await api.post("/awareness", payload);
        setSuccess("Content created successfully.");
      }
      setForm(emptyForm);
      setEditId(null);
      fetchContents();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save content.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (item) => {
  setEditId(null);
  setError("");
  setSuccess("");
  try {
    const res = await api.get(`/awareness/${item.slug}`);
    const full = res.data.content;
    setForm({
      title: full.title,
      slug: full.slug,
      category: full.category,
      summary: full.summary,
      content: full.content,
      tips: Array.isArray(full.tips) ? full.tips.join("\n") : "",
      isPublished: full.isPublished,
    });
    setEditId(full._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch {
    setError("Failed to load content for editing.");
  }
};

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this content?")) return;
    try {
      await api.delete(`/awareness/${id}`);
      setSuccess("Content deleted.");
      fetchContents();
    } catch {
      setError("Failed to delete content.");
    }
  };

  const handleCancel = () => {
  setForm(emptyForm);
  setEditId(null);
  setError("");
  setSuccess("");
};
  const filtered = filter === "all" ? contents : contents.filter((c) => c.category === filter);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Awareness Content</h1>
        <p className="text-gray-500 text-sm">Create and manage educational content for each module.</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
        <h2 className="text-white font-semibold mb-5">
          {editId ? "Edit Content" : "Add New Content"}
        </h2>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm px-4 py-3 rounded-xl mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Title</label>
              <input
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                placeholder="Password Hygiene Basics"
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">
                Slug <span className="text-gray-600">(auto-generated)</span>
              </label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
                placeholder="password-hygiene-basics"
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Status</label>
              <select
                value={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.value === "true" })}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Summary</label>
            <textarea
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              rows={2}
              required
              placeholder="Short description shown in content cards..."
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">Main Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={6}
              required
              placeholder="Full educational content goes here..."
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">
              Tips <span className="text-gray-600">(one per line)</span>
            </label>
            <textarea
              value={form.tips}
              onChange={(e) => setForm({ ...form, tips: e.target.value })}
              rows={4}
              placeholder={`Use a unique password for every account\nEnable two-factor authentication\nUse a password manager`}
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-gray-950 font-bold py-3 rounded-xl text-sm transition-colors"
            >
              {saving ? "Saving..." : editId ? "Update Content" : "Add Content"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={handleCancel}
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
            All Content{" "}
            <span className="text-gray-600 font-normal text-sm">({filtered.length})</span>
          </h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-2 text-sm focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
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
            No content found. Add one above.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <div
                key={item._id}
                className="bg-gray-800/50 border border-gray-800 hover:border-gray-700 rounded-xl p-4 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium mb-1">{item.title}</p>
                    <p className="text-gray-500 text-xs mb-2 leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-700 text-gray-400 px-2.5 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-xs bg-gray-700 text-gray-500 px-2.5 py-1 rounded-full">
                        /{item.slug}
                      </span>
                      <span className={`text-xs px-2.5 py-1 rounded-full ${
                        item.isPublished
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-gray-700 text-gray-500"
                      }`}>
                        {item.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
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

export default AdminContent;