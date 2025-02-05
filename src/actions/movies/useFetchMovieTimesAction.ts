import { UseSuspenseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { header } from '..';

export type MovieTimeType = {
  theater_id: number; // 극장ID
  room_id: number; // 상영관ID
  room_nm: string; // 상영관이름
  movie_id: number; // 영화ID
  date: string; // 날짜 (YYYYMMDD)
  time: string; // 상영시간 (HH:MM)
  seat_state: string[]; // 좌석 예매 현황 (['A03', 'B04'])
};

export const getFetchMovieTimesQuery = (
  theaterId: number,
  movieId: number,
  date: string,
): UseSuspenseQueryOptions<MovieTimeType[], unknown> => {
  return {
    queryKey: ['movieTime', theaterId, movieId, date],
    queryFn: async () => {
      const res = await axios.get(`/book/api/movieTime?theater_id=${theaterId}&movie_id=${movieId}&date=${date}`, {
        baseURL: process.env.NEXT_PUBLIC_API,
        headers: {
          ...header,
        },
      });
      return res.data;
    },
  };
};
