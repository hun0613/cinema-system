import { TheaterType } from "@/data/dataType";
import { UseSuspenseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { header } from "..";

export const getFetchTheatersQuery = (): UseSuspenseQueryOptions<
  TheaterType[],
  unknown
> => {
  return {
    queryKey: ["theaters"],
    queryFn: async () => {
      const res = await axios.get(`/book/api/theater`, {
        ...header,
      });
      return res.data;
    },
  };
};
