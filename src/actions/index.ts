import { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type UseMutationAction<TData, TResult = void> = (
  options?: UseMutationOptions<TData, AxiosError, TResult>,
) => UseMutationResult<TData, AxiosError, TResult>;
