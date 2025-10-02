import React from "react";
import type { Article } from ".././utils/mockData";

interface DetailProps {
  article: Article;
  onBack: () => void;
  onEdit: (article: Article) => void;
}

const DetailPage: React.FC<DetailProps> = ({ article, onBack, onEdit }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onBack}
          className="text-blue-500 hover:underline"
        >
          ← Kembali
        </button>
        <button
          onClick={() => onEdit(article)}
          className="text-green-500 hover:underline"
        >
          ✏️ Edit
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-gray-600 mb-2">
        {article.author} - {article.date}
      </p>
      <p className="text-gray-700">{article.content}</p>
    </div>
  );
};

export default DetailPage;
