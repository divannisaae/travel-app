import React from "react";

const LandingPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-200">
      <h1 className="text-5xl font-bold text-sky-800">Travel Journal</h1>
      <p className="text-sky-700">Inspirasi perjalanan Anda, dari kota hingga gunung.</p>
      <div className="mt-6 flex gap-4">
        {/* 🔥 Pakai onNavigate untuk pindah halaman */}
        <button
          onClick={() => onNavigate("articles")}
          className="px-6 py-3 bg-sky-500 text-white rounded-full shadow hover:bg-sky-600"
        >
          Lihat Semua Artikel
        </button>
        <button
          onClick={() => onNavigate("login")}
          className="px-6 py-3 border border-sky-500 text-sky-500 rounded-full hover:bg-sky-100"
        >
          Masuk
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
