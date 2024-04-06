enum MovieClassification {
  Expected = 0,
  InProgress = 1,
  End = 2,
}

interface movieType {
  id: number;
  title: string;
  summary: string;
  rating: number;
  reservation_rate: number;
  classification: MovieClassification;
  background_img: string;
  poster_img: string;
}

export const movieData: movieType[] = [
  {
    id: 1,
    title: "어벤져스",
    summary: "존잼",
    rating: 8.7,
    reservation_rate: 43,
    classification: MovieClassification.InProgress,
    background_img: "/images/dummyImg.jpg",
    poster_img: "/images/dummyImg.jpg",
  },
];
