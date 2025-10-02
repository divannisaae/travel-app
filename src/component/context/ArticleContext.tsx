import { createContext } from "react";
import type { Article } from "../../types/article";

// STATE & ACTION
export interface ArticleState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

export type ArticleAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Article[] }
  | { type: "ADD_ARTICLE"; payload: Article }
  | { type: "UPDATE_ARTICLE"; payload: Article }
  | { type: "DELETE_ARTICLE"; payload: number };

// VALUE
export interface ArticleContextValue {
  state: ArticleState;
  fetchArticles: () => void;
  addArticle: (article: Article) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (id: number) => void;
}

// INITIAL STATE
export const initialState: ArticleState = {
  articles: [],
  loading: false,
  error: null,
};

// CONTEXT
export const ArticleContext = createContext<ArticleContextValue | undefined>(
  undefined
);
