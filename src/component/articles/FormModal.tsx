import React, { useState, useEffect } from "react";
import type { Article } from ".././utils/mockData";

interface FormModalProps {
  article?: Article; // optional → kalo ada berarti edit, kalo nggak ada berarti add
  onClose: () => void;
  onSave: (article: Article) => void;
}

const FormModal: React.FC<FormModalProps> = ({ article, onClose, onSave }) => {
  const [formData, setFormData] = useState<Article>({
    id: Date.now(),
    title: "",
    summary: "",
    author: "",
    date: new Date().toISOString(),
    category: "",
    content: "",
    views: 0,
  });

  // Kalau artikel ada → isi form dengan data artikel
  useEffect(() => {
    if (article) {
      setFormData(article);
    }
  }, [article]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // kirim ke parent (ListPage / DetailPage)
    onClose(); // tutup modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {article ? "Edit Artikel" : "Tambah Artikel"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Judul Artikel"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Penulis"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Kategori"
            className="w-full border p-2 rounded"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Isi Artikel"
            className="w-full border p-2 rounded h-32"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {article ? "Simpan Perubahan" : "Tambah Artikel"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-4 py-2 rounded border border-gray-400"
          >
            Batal
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
