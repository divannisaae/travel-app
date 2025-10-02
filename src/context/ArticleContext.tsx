import React, { createContext, useReducer, useCallback, useMemo, useContext } from "react";
import type { Article } from "../";
import { ALL_MOCK_ARTICLES } from "../utils/mockData";

interface ArticleState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

type ArticleAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Article[] }
  | { type: "ADD_ARTICLE"; payload: Article }
  | { type: "UPDATE_ARTICLE"; payload: Article }
  | { type: "DELETE_ARTICLE"; payload: number };

const initialState: ArticleState = { articles: [], loading: false, error: null };

const ArticleContext = createContext<any>(null);

const reducer = (state: ArticleState, action: ArticleAction): ArticleState => {
  switch (action.type) {
    case "FETCH_START": return { ...state, loading: true };
    case "FETCH_SUCCESS": return { ...state, loading: false, articles: action.payload };
    case "ADD_ARTICLE": return { ...state, articles: [action.payload, ...state.articles] };
    case "UPDATE_ARTICLE": return { ...state, articles: state.articles.map(a => a.id === action.payload.id ? action.payload : a) };
    case "DELETE_ARTICLE": return { ...state, articles: state.articles.filter(a => a.id !== action.payload) };
    default: return state;
  }
};

export const ArticleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchArticles = useCallback(() => {
    dispatch({ type: "FETCH_START" });
    setTimeout(() => dispatch({ type: "FETCH_SUCCESS", payload: ALL_MOCK_ARTICLES }), 350);
  }, []);

  const addArticle = useCallback((article: Article) => dispatch({ type: "ADD_ARTICLE", payload: article }), []);
  const updateArticle = useCallback((article: Article) => dispatch({ type: "UPDATE_ARTICLE", payload: article }), []);
  const deleteArticle = useCallback((id: number) => dispatch({ type: "DELETE_ARTICLE", payload: id }), []);

  const value = useMemo(
    () => ({ state, fetchArticles, addArticle, updateArticle, deleteArticle }),
    [state, fetchArticles, addArticle, updateArticle, deleteArticle]
  );

  return <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useArticles = () => useContext(ArticleContext);
