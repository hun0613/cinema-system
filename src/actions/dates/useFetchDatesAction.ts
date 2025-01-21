import { DateType } from "@/data/dataType";
import { UseSuspenseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

export const getFetchDatesQuery = (): UseSuspenseQueryOptions<
  DateType[],
  unknown
> => {
  return {
    queryKey: ["date"],
    queryFn: async () => {
      const res = await axios.get(`/book/api/date`, {
        baseURL: process.env.NEXT_PUBLIC_API,
      });
      return res.data;
    },
  };
};
