import React from "react";
import type { Article } from "../../types/article";
import Icon from "../common/Icon";

interface Props {
  article: Article;
  onSelect: (article: Article) => void;
  onEdit: (article: Article) => void;
  onDelete: (id: number) => void;
}

const ArticleCard: React.FC<Props> = ({ article, onSelect, onEdit, onDelete }) => (
  <div
    onClick={() => onSelect(article)}
    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer flex flex-col justify-between"
  >
    <div>
    <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-medium">
    {article.category}
    </span>

      <h2 className="text-xl font-bold mt-2">{article.title}</h2>
      <p className="text-gray-600 text-sm">{article.summary}</p>
    </div>
    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
      <span>✍ {article.author}</span>
      <div className="flex space-x-2">
        <button onClick={(e) => { e.stopPropagation(); onEdit(article); }} className="text-blue-500"><Icon name="Edit" /></button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(article.id); }} className="text-red-500"><Icon name="Trash" /></button>
      </div>
    </div>
  </div>
);

export default ArticleCard;
