import React, { useEffect } from "react";
import { useArticles } from ".././context/ArticleContext";
import { useAuth } from ".././context/AuthContext";
import Card from "./Card";
import SkeletonCard from "../common/SkeletonCard";
import type { Article } from "../utils/mockData";

const ListPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { state, fetchMoreArticles, deleteArticle } = useArticles();
  const { state: authState, logout } = useAuth();

  useEffect(() => {
    fetchMoreArticles();
  }, [fetchMoreArticles]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Travel Journal</h1>
        {authState.isLoggedIn ? (
          <button onClick={logout} className="text-red-500">Logout</button>
        ) : (
          <button onClick={() => onNavigate("login")} className="text-blue-500">Login</button>
        )}
      </header>

      {state.articles.length === 0 && state.loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonCard /><SkeletonCard />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
       {state.articles.map((article: Article) => (
        <Card
            key={article.id}
            article={article}
            onSelect={(id) => console.log("Select article:", id)}   
            onEdit={(art) => console.log("Edit article:", art)}  
            onDelete={(id) => deleteArticle(id)}                  
        />
        ))}

      </div>
    </div>
  );
};

export default ListPage;
