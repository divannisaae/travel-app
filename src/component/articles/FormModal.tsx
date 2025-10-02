import React, { useEffect, useState } from "react";
import type { Article } from "../../types/article";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: Omit<Article, "id" | "views" | "author">) => void;
  articleToEdit?: Article | null;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, onSave, articleToEdit }) => {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    category: "City" as "City" | "Mountain" | "Beach" | "Culture",
    content: "",
    date: new Date().toISOString().slice(0, 10),
  });

  // Saat edit, isi form dengan data artikel
  useEffect(() => {
    if (articleToEdit) {
      const { title, summary, category, content, date } = articleToEdit;
      setForm({ title, summary, category, content, date });
    } else {
      // reset kalau bukan edit
      setForm({
        title: "",
        summary: "",
        category: "City",
        content: "",
        date: new Date().toISOString().slice(0, 10),
      });
    }
  }, [articleToEdit]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 font-sans">
      <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {articleToEdit ? "✏️ Edit Artikel" : " Tambah Artikel"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Judul Artikel"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 rounded-lg p-3 text-gray-700 placeholder-gray-400"
          />

          <input
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="Ringkasan"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 rounded-lg p-3 text-gray-700 placeholder-gray-400"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 rounded-lg p-3 text-gray-700"
          >
            <option value="Mountain">🏔 Mountain</option>
            <option value="Beach">🏖 Beach</option>
            <option value="City">🏙 City</option>
            <option value="Culture">🎭 Culture</option>
          </select>

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Konten artikel..."
            className="w-full border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 rounded-lg p-3 text-gray-700 placeholder-gray-400 h-32"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 rounded-lg p-3 text-gray-700"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg text-gray-600 border-gray-300 hover:bg-gray-100 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-500 text-white rounded-lg shadow hover:bg-sky-600 transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
