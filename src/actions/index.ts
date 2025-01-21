import { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type UseMutationAction<TData, TResult = void> = (
  options?: UseMutationOptions<TData, AxiosError, TResult>,
) => UseMutationResult<TData, AxiosError, TResult>;

export const header = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  "Access-Control-Allow-Headers":
    "Origin, X-Auth-Token, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
};
