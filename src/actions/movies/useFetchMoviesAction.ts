import { UseSuspenseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { header } from '..';
import { MovieType } from './useFetchMovieAction';

export const getFetchMoviesQuery = (): UseSuspenseQueryOptions<MovieType[], unknown> => {
  return {
    queryKey: ['movies'],
    queryFn: async () => {
      const res = await axios.get(`/api`, {
        baseURL: process.env.NEXT_PUBLIC_API,
        headers: {
          ...header,
        },
      });
      return res.data;
    },
  };
};
