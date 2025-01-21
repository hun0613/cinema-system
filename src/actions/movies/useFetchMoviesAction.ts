import { movieType } from "@/data/dataType";
import { UseSuspenseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { header } from "..";

export const getFetchMoviesQuery = (): UseSuspenseQueryOptions<
  movieType[],
  unknown
> => {
  return {
    queryKey: ["movies"],
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
