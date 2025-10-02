import { useContext } from "react";
import { ArticleContext, type ArticleContextValue } from "./ArticleContext";

export const useArticles = (): ArticleContextValue => {
  const ctx = useContext(ArticleContext);
  if (!ctx) throw new Error("useArticles must be used inside ArticleProvider");
  return ctx;
};
