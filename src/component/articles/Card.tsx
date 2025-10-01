import React from "react";
import type { Article } from ".././utils/mockData";
import Icon from "../common/Icon";


interface Props {
  article: Article;
  onSelect: (id: number) => void;
  onEdit: (article: Article) => void;
  onDelete: (id: number) => void;
}

const Card: React.FC<Props> = ({ article, onSelect, onEdit, onDelete }) => (
  <div onClick={() => onSelect(article.id)} className="bg-white p-6 rounded-xl shadow hover:shadow-xl cursor-pointer">
    <h2 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h2>
    <p className="text-sm text-gray-500 mb-2">{article.summary}</p>
    <div className="flex justify-between text-sm text-gray-400">
      <span>{article.author}</span>
      <span>{article.date}</span>
    </div>
    <div className="flex space-x-2 mt-2">
      <button onClick={(e) => { e.stopPropagation(); onEdit(article); }} className="text-blue-500 flex items-center">
        <Icon name="Plus" className="w-4 h-4 mr-1"/> Edit
      </button>
      <button onClick={(e) => { e.stopPropagation(); onDelete(article.id); }} className="text-red-500 flex items-center">
        <Icon name="User" className="w-4 h-4 mr-1"/> Delete
      </button>
    </div>
  </div>
);

export default Card;
