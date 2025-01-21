import { DateType } from "@/data/dataType";
import { UseSuspenseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { header } from "..";

export const getFetchDatesQuery = (): UseSuspenseQueryOptions<
  DateType[],
  unknown
> => {
  return {
    queryKey: ["date"],
    queryFn: async () => {
      const res = await axios.get(`/book/api/date`, {
        ...header,
      });
      return res.data;
    },
  };
};
