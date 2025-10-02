import React, { useEffect, useState } from "react";
import type { Article } from "../../types/article";
import { useArticles } from "../../context/ArticleContext";
import { useAuth } from "../../context/AuthContext";
import ArticleCard from "./ArticleCard";
import DetailPage from "./DetailPage";
import ArticleFormModal from "./FormModal";
import Icon from "../common/Icon";

// eslint-disable-next-line no-empty-pattern
const ListPage: React.FC<{ onNavigate: (page: string) => void }> = ({ }) => {
  const { state, fetchArticles, addArticle, updateArticle, deleteArticle } = useArticles();
  const { state: auth, logout } = useAuth();

  const [selected, setSelected] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Article | null>(null);

  // filter & sort states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => { fetchArticles(); }, [fetchArticles]);

  // ambil artikel terpilih
  const selectedArticle = state.articles.find((a: Article) => a.id === selected) || null;

  // apply filter + search + sort
    const filteredArticles = state.articles
  .filter((a: Article) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase()) ||
      a.author.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "all" || a.category === category;
    return matchSearch && matchCategory;
  })

    .sort((a: Article, b: Article) => {
  if (sortBy === "views") return b.views - a.views;
  return new Date(b.date).getTime() - new Date(a.date).getTime();
  });


  
if (selectedArticle) {
  return (
    <DetailPage
      article={selectedArticle}
      onBack={() => setSelected(null)}
      onEdit={(a) => {
        setEditData(a);
        setModalOpen(true);
      }}
      onDelete={(id) => deleteArticle(id)}
    />
  );
}

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* HEADER */}
    <header className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-sky-600">Travel Journal</h1>
  {auth.isLoggedIn && (
    <button
      onClick={logout}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
      </button>
  )}
    </header>

    <button
      onClick={() => { setModalOpen(true); setEditData(null); }}
      className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
    >
      Buat Artikel Baru
    </button>


      {/* FILTERS */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
        <input
          type="text"
          placeholder="Cari judul, ringkasan, atau penulis..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
          <option value="all">Semua Kategori</option>
          <option value="Mountain">Mountain</option>
          <option value="Beach">Beach</option>
          <option value="City">City</option>
          <option value="Culture">Culture</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border p-2 rounded">
          <option value="date">Terbaru</option>
          <option value="views">Paling Populer</option>
        </select>
      </div>

      {/* TOMBOL TAMBAH */}
      {auth.isLoggedIn && (
        <button
          onClick={() => { setModalOpen(true); setEditData(null); }}
          className="mb-6 bg-teal-600 text-white px-4 py-2 rounded flex items-center"
        >
          <Icon name="Plus" className="w-4 h-4 mr-2" /> Tambah Artikel
        </button>
      )}

      {/* LIST */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.map((a: Article) => (
        <ArticleCard
          key={a.id}
          article={a}
          onSelect={(art: Article) => setSelected(art.id)}
          onEdit={(art: Article) => { setEditData(art); setModalOpen(true); }}
          onDelete={(id: number) => deleteArticle(id)}
        />
      ))}
    </div>


      {/* MODAL */}
      <ArticleFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(article) => {
          if (editData) updateArticle({ ...editData, ...article });
          else addArticle({ ...article, id: Date.now(), views: 0, author: auth.user?.username || "Anonim" });
        }}
        articleToEdit={editData}
      />
    </div>
  );
};

export default ListPage;
