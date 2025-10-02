export interface Article {
  id: number;
  title: string;
  author: string;
  date: string; // YYYY-MM-DD
  category: "Mountain" | "Beach" | "City" | "Culture";
  summary: string;
  content: string;
  views: number;
}
