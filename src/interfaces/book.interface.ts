export interface book {
    id?: string;
    title?: string;
    isbn?: string;
    authors?: string[];
    genres?: string[];
    publishedDate?: string;
    rating?: number;
    total_reviews?: number;
    total_copies?: number;
    available_copies?: number;
    image_link?: string;
  }