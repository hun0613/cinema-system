import { TheaterType } from "@/data/dataType";
import { UseSuspenseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

export const getFetchTheatersQuery = (): UseSuspenseQueryOptions<
  TheaterType[],
  unknown
> => {
  return {
    queryKey: ["theaters"],
    queryFn: async () => {
      const res = await axios.get(`/book/api/theater`, {
        baseURL: process.env.NEXT_PUBLIC_API,
        withCredentials: true,
      });
      return res.data;
    },
  };
};
