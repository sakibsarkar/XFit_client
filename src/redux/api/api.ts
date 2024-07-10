/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  baseQuery: fetchBaseQuery({
    baseUrl: "https://xfit-backend.vercel.app/api/v1",
  }),
  endpoints: () => ({}),
  tagTypes: ["product"],
});
