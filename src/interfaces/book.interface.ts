export interface book {
    id?: string;
    title?: string;
    isbn?: number;
    authors?: string[];
    genres?: string[];
    publishedDate?: Date;
    rating?: number;
    totalReviews?: number;
    total_copies?: number;
    available_copies?: number;
    image_link?: string;
  }