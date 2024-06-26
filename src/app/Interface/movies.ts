export interface MoviesInterface {
    title: string;
    thumbnail:  {
      trending: {
        small: string;
        large: string;
      };
      regular: {
        small: string;
        medium: string;
        large: string;
      };
    };
    year: number;
    category: string;
    categoryImage?: string;
    rating: string;
    isBookmarked: boolean;
    isTrending: boolean;
    id: number;
  }