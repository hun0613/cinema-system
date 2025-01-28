export enum MOVIE_CLASSIFICATION {
  EXPECT = 0,
  IN_PROGRESS = 1,
  END = 2,
}

export enum MOVIE_FILTER_TAB {
  EXPECT = 0,
  IN_PROGRESS = 1,
  END = 2,
  SEARCH = 3,
}

export type MovieType = {
  id: number;
  title: string;
  summary: string;
  rating: number;
  reservation_rate: number;
  classification: MOVIE_CLASSIFICATION;
  background_img: string;
  poster_img: string;
};
