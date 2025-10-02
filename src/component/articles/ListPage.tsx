import React, { useEffect, useState } from "react";
import { useArticles } from "../context/ArticleContext";
import { useAuth } from "../context/AuthContext";
import Card from "./Card";
import SkeletonCard from "../common/SkeletonCard";
import DetailPage from "./DetailPage";

const ListPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { state, fetchMoreArticles, deleteArticle } = useArticles();
  const { state: authState, logout } = useAuth();

  // 🔹 untuk handle detail article
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  // 🔹 fetch data pertama kali
  useEffect(() => {
    fetchMoreArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // cari article yang dipilih
  const articleDetail = state.articles.find(a => a.id === selectedArticle) || null;

  // 🔹 Kalau ada artikel yang dipilih → render halaman detail
  if (articleDetail) {
    return (
      <DetailPage
        article={articleDetail}
        onBack={() => setSelectedArticle(null)}   // tombol back
        onEdit={() => console.log("Edit clicked")}
      />
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Travel Journal</h1>
        {authState.isLoggedIn ? (
          <button onClick={logout} className="text-red-500">Logout</button>
        ) : (
          <button onClick={() => onNavigate("login")} className="text-blue-500">
            Login
          </button>
        )}
      </header>

      {/* Loader */}
      {state.articles.length === 0 && state.loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* Daftar Artikel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.articles.map(article => (
          <Card
            key={article.id}
            article={article}
            onSelect={() => setSelectedArticle(article.id)} // masuk detail
            onEdit={() => console.log("Edit clicked")}
            onDelete={deleteArticle}
          />
        ))}
      </div>

      {/* Info kalau tidak ada artikel */}
      {!state.loading && state.articles.length === 0 && (
        <p className="text-center text-gray-500 mt-6">Belum ada artikel.</p>
      )}
    </div>
  );
};

export default ListPage;
