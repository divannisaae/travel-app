import React from "react";

const LandingPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-teal-600 text-white">
    <h1 className="text-5xl font-bold mb-4">Travel Journal</h1>
    <p className="mb-6">Inspirasi perjalananmu, dari kota sampai gunung</p>
    <div className="space-x-4">
      <button onClick={() => onNavigate("articles")} className="bg-white text-teal-600 px-6 py-2 rounded-lg font-semibold">Lihat Artikel</button>
      <button onClick={() => onNavigate("login")} className="bg-teal-800 px-6 py-2 rounded-lg font-semibold">Login</button>
    </div>
  </div>
);

export default LandingPage;
