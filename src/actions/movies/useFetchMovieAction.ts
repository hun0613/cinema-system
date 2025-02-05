import { UseSuspenseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { header } from '..';

export type MovieType = {
  id: number; // id
  title: string; // 제목
  summary: string; // 줄거리
  rating: number; // 평점
  reservation_rate: number; // 예매율
  release_date: string; // 개봉일시
  classification: number; // 상영여부
  background_img: string; // 배경이미지
  poster_img: string; // 포스터이미지
};

export const getFetchMovieQuery = (postId: number): UseSuspenseQueryOptions<MovieType, unknown> => {
  return {
    queryKey: ['movie', postId],
    queryFn: async () => {
      const res = await axios.get(`/book/api?id=${postId}`, {
        baseURL: process.env.NEXT_PUBLIC_API,
        headers: {
          ...header,
        },
      });
      return res.data[0];
    },
  };
};
