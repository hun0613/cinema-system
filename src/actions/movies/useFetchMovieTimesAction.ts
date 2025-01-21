import { MovieTimeType } from "@/data/dataType";
import { UseSuspenseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { header } from "..";

export const getFetchMovieTimesQuery = (
  theaterId: number,
  movieId: number,
  date: string,
): UseSuspenseQueryOptions<MovieTimeType[], unknown> => {
  return {
    queryKey: ["movieTime", theaterId, movieId, date],
    queryFn: async () => {
      const res = await axios.get(
        `/book/api/movieTime?theater_id=${theaterId}&movie_id=${movieId}&date=${date}`,
        {
          ...header,
        },
      );
      return res.data;
    },
  };
};
