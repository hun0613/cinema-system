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
        ...header,
      });
      return res.data;
    },
  };
};
