import { UseSuspenseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { header } from '..';

export type DateType = {
  date: string; // 날짜 (YYYYMMDD);
  week: string; // 요일 (월 ~ 일);
  holiday_yn: string; // 공휴일 여부 (Y/N);
};

export const getFetchDatesQuery = (): UseSuspenseQueryOptions<DateType[], unknown> => {
  return {
    queryKey: ['date'],
    queryFn: async () => {
      const res = await axios.get(`/book/api/date`, {
        baseURL: process.env.NEXT_PUBLIC_API,
        headers: {
          ...header,
        },
      });
      return res.data;
    },
  };
};
