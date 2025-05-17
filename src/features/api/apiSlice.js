import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: async (header, { getState, endpoints }) => {
      const token = getState().auth.accessToken;
      if (token) {
        header.set(`Authorization`, `Bearer ${token}`);
      }
      return header;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});

export default apiSlice;
