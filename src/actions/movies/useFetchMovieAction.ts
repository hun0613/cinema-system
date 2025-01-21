import { movieType } from "@/data/dataType";
import { UseSuspenseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { header } from "..";

export const getFetchMovieQuery = (
  postId: number,
): UseSuspenseQueryOptions<movieType, unknown> => {
  return {
    queryKey: ["movie", postId],
    queryFn: async () => {
      const res = await axios.get(`/book/api?id=${postId}`, {
        ...header,
      });
      return res.data[0];
    },
  };
};
