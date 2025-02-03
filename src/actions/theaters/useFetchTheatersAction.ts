import { UseSuspenseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { header } from "..";

export type TheaterType = {
  theater_id: number;
  name: string; // 극장 이름
  position: string; // 극장 위치
  latitude: number; // 위도
  longitude: number; // 경도
};

export const getFetchTheatersQuery = (): UseSuspenseQueryOptions<TheaterType[], unknown> => {
  return {
    queryKey: ["theaters"],
    queryFn: async () => {
      const res = await axios.get(`/book/api/theater`, {
        baseURL: process.env.NEXT_PUBLIC_API,
        headers: {
          ...header,
        },
      });
      return res.data;
    },
  };
};
