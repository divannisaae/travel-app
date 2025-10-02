import React from "react";
import type { Article } from "../../types/article";
import Icon from "../common/Icon";

interface DetailProps {
  article: Article;
  onBack: () => void;
  onEdit: (article: Article) => void;
  onDelete: (id: number) => void;
}

const DetailPage: React.FC<DetailProps> = ({ article, onBack, onEdit, onDelete }) => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Tombol Kembali */}
      <button
        onClick={onBack}
        className="flex items-center text-sky-600 mb-6 hover:underline"
      >
        <Icon name="Back" className="w-5 h-5 mr-2" /> Kembali
      </button>

      {/* Judul */}
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        Oleh <span className="font-semibold">{article.author}</span> • {article.date}
      </p>

      {/* Isi */}
      <p className="mb-4 text-gray-700 italic">{article.summary}</p>
      <p className="text-gray-800 whitespace-pre-wrap">{article.content}</p>

      {/* Tombol Aksi */}
      <div className="flex gap-2 mt-6">
        <button
          onClick={() => onEdit(article)}
          className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(article.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
