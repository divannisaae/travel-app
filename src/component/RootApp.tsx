/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ArticleProvider } from "./context/ArticleContext";

import LandingPage from "./layout/LandingPage";
import AuthForm from "./auth/Auth";
import ArticleListPage from "./articles/ListPage";
import DetailPage from "./articles/DetailPage"; // kalau mau detail
import FormModal from "./articles/FormModal";   // kalau mau tambah/edit artikel

const RootApp: React.FC = () => {
  const [page, setPage] = useState("landing");
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const renderPage = () => {
    switch (page) {
      case "landing": 
        return <LandingPage onNavigate={setPage} />;
      case "login": 
        return <AuthForm type="login" onNavigate={setPage} />;
      case "register": 
        return <AuthForm type="register" onNavigate={setPage} />;
      case "articles": 
        return <ArticleListPage onNavigate={setPage} />;
      case "detail":
        return (
          <DetailPage
            article={selectedArticle}
            onBack={() => setPage("articles")}
            onEdit={(a) => {
              setSelectedArticle(a);
              setPage("edit");
            }}
          />
        );
      case "edit":
        return (
          <FormModal
            article={selectedArticle}
            onClose={() => setPage("articles")}
            onSave={(a) => {
              console.log("Saved:", a);
              setPage("articles");
            }}
          />
        );
      default:
        return <LandingPage onNavigate={setPage} />;
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
