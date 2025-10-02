import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ArticleProvider } from "./context/ArticleContext";

import LandingPage from "./component/layout/LandingPage";
import AuthForm from "./component/auth/AuthForm";
import ArticleListPage from "./component/articles/ListPage";

const App: React.FC = () => {
  const [page, setPage] = useState("landing");

  return (
    <AuthProvider>
      <ArticleProvider>
        <div className="font-sans min-h-screen bg-gray-50">
          {page === "landing" && <LandingPage onNavigate={setPage} />}
          {page === "login" && <AuthForm type="login" onNavigate={setPage} />}
          {page === "register" && <AuthForm type="register" onNavigate={setPage} />}
          {page === "articles" && <ArticleListPage onNavigate={setPage} />}
        </div>
      </ArticleProvider>
    </AuthProvider>
  );
};

export default App;
