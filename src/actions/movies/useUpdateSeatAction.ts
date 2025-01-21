import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { UseMutationAction, header } from "..";
import { getFetchMovieTimesQuery } from "./useFetchMovieTimesAction";

export type updateSeatData = {
  theater_id: number;
  room_id: number;
  movie_id: number;
  date: string;
  time: string;
  seat: string[];
};

const updateSeat: MutationFunction<{ res: string }, updateSeatData> = async (
  data: updateSeatData,
) => {
  const res = await axios.patch(`/book/api/updateSeat`, data, {
    baseURL: process.env.NEXT_PUBLIC_API,
    headers: {
      ...header,
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

const useUpdateSeatAction: UseMutationAction<
  { res: string },
  updateSeatData
> = (options) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSeat,
    ...options,
    onSuccess: (data, variable, context) => {
      queryClient.invalidateQueries({
        queryKey: getFetchMovieTimesQuery(
          variable.theater_id,
          variable.movie_id,
          variable.date,
        ).queryKey,
      });
    },
  });
};

export default useUpdateSeatAction;
