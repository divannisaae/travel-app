import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ArticleProvider } from "./context/ArticleContext";
import LandingPage from "./layout/LandingPage";
import AuthForm from "./auth/Auth";
import ArticleListPage from "./articles/ListPage";

const RootApp: React.FC = () => {
  const [page, setPage] = useState("landing");

  const renderPage = () => {
    switch (page) {
      case "landing": return <LandingPage onNavigate={setPage} />;
      case "login": return <AuthForm type="login" onNavigate={setPage} />;
      case "register": return <AuthForm type="register" onNavigate={setPage} />;
      case "articles": return <ArticleListPage onNavigate={setPage} />;
      default: return <LandingPage onNavigate={setPage} />;
    }
  };

  return (
    <AuthProvider>
      <ArticleProvider>
        {renderPage()}
      </ArticleProvider>
    </AuthProvider>
  );
};

export default RootApp;
