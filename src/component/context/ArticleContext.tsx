import React, {createContext,useReducer,useCallback,useMemo,useContext,} from "react";
import type { Article } from "../utils/mockData";

// --- STATE TYPE ---
interface ArticleState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

// --- ACTION TYPE ---
type ArticleAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Article[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "ADD_ARTICLE"; payload: Article }
  | { type: "UPDATE_ARTICLE"; payload: Article }
  | { type: "DELETE_ARTICLE"; payload: number };

// --- CONTEXT VALUE ---
interface ArticleContextValue {
  state: ArticleState;
  fetchMoreArticles: () => void;
  addArticle: (article: Article) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (id: number) => void;
}

// --- INITIAL STATE ---
const initialArticleState: ArticleState = {
  articles: [],
  loading: false,
  error: null,
};

const ArticleContext = createContext<ArticleContextValue | undefined>(
  undefined
);

// --- REDUCER ---
const articleReducer = (
  state: ArticleState,
  action: ArticleAction
): ArticleState => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, articles: [...state.articles, ...action.payload] };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_ARTICLE":
      return { ...state, articles: [action.payload, ...state.articles] };
    case "UPDATE_ARTICLE":
      return {
        ...state,
        articles: state.articles.map((a) =>
          a.id === action.payload.id ? action.payload : a
        ),
      };
    case "DELETE_ARTICLE":
      return {
        ...state,
        articles: state.articles.filter((a) => a.id !== action.payload),
      };
    default:
      return state;
  }
};

// --- PROVIDER ---
export const ArticleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(articleReducer, initialArticleState);

const fetchMoreArticles = useCallback(() => {
  dispatch({ type: "FETCH_START" });
  try {
    setTimeout(() => {
    const dummy: Article[] = [
    {
        id: Date.now(),
        title: "Mountain Adventure",
        summary: "Explore the mountains!",
        author: "System",
        date: new Date().toISOString(),
        category: "Mountain",
        content: "This is a dummy article about mountains...",
        views: 0,
    },
    ];

      dispatch({ type: "FETCH_SUCCESS", payload: dummy });
    }, 1000);
  } catch {
    dispatch({ type: "FETCH_ERROR", payload: "Failed to load articles" });
  }
}, []);


  const addArticle = useCallback((article: Article) => {
    dispatch({ type: "ADD_ARTICLE", payload: article });
  }, []);

  const updateArticle = useCallback((article: Article) => {
    dispatch({ type: "UPDATE_ARTICLE", payload: article });
  }, []);

  const deleteArticle = useCallback((id: number) => {
    dispatch({ type: "DELETE_ARTICLE", payload: id });
  }, []);

  const value = useMemo(
    () => ({ state, fetchMoreArticles, addArticle, updateArticle, deleteArticle }),
    [state, fetchMoreArticles, addArticle, updateArticle, deleteArticle]
  );

  return (
    <ArticleContext.Provider value={value}>
      {children}
    </ArticleContext.Provider>
  );
};

// --- HOOK ---
// eslint-disable-next-line react-refresh/only-export-components
export const useArticles = () => {
  const ctx = useContext(ArticleContext);
  if (!ctx) throw new Error("useArticles must be used within ArticleProvider");
  return ctx;
};
