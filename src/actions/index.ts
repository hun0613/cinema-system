import { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type UseMutationAction<TData, TResult = void> = (
  options?: UseMutationOptions<TData, AxiosError, TResult>,
) => UseMutationResult<TData, AxiosError, TResult>;

export const header = {
  baseURL: process.env.NEXT_PUBLIC_API,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
};
