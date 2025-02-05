import { UseSuspenseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { header } from '..';

export type BookType = {
  book_id: number;
  title: string;
  poster_img: string;
  name: string;
  room_nm: string;
  date: string;
  time: string;
  seat: string[];
};

export const getFetchBookQuery = (bookId: number): UseSuspenseQueryOptions<BookType, unknown> => {
  return {
    queryKey: ['book', bookId],
    queryFn: async () => {
      const res = await axios.get(`/book/api/book?book_id=${bookId}`, {
        baseURL: process.env.NEXT_PUBLIC_API,
        headers: {
          ...header,
        },
      });
      return res.data[0];
    },
  };
};
