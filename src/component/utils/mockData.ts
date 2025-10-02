export interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  category: "" | "Mountain" | "Beach" | "City" | "Culture";
  summary: string;
  content: string;
  views: number;
}

export const ALL_MOCK_ARTICLES: Article[] = [
  { id: 1, title: "Mengintip Keindahan Bawah Laut Raja Ampat", author: "Rani Suryani", date: "2025-08-10", category: 'Beach', views: 1200, summary: "Raja Ampat...", content: "Raja Ampat terkenal..." },
  { id: 2, title: "Panduan Menjelajahi Kota Tua Jakarta", author: "Bambang", date: "2025-09-25", category: 'City', views: 850, summary: "Jejak Belanda...", content: "Kota Tua Jakarta..." },
  { id: 3, title: "Tips Pendakian Gunung Bromo", author: "Siti Rahma", date: "2025-10-01", category: 'Mountain', views: 1500, summary: "Musim kemarau...", content: "Bromo..." },
];

export const ITEMS_PER_PAGE = 3;
