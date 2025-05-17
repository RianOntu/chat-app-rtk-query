import apiSlice from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        localStorage.setItem(
          "auth",
          JSON.stringify({
            accessToken: result.data.accessToken,
            user: result.data.user,
          })
        );
        dispatch(
          userLoggedIn({
            accessToken: result.data.accessToken,
            user: result.data.user,
          })
        );
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        localStorage.setItem(
          "auth",
          JSON.stringify({
            accessToken: result.data.accessToken,
            user: result.data.user,
          })
        );
        dispatch(
          userLoggedIn({
            accessToken: result.data.accessToken,
            user: result.data.user,
          })
        );
      },
    }),
  }),
});

export const { useRegisterMutation } = authApi;
export default authApi;
