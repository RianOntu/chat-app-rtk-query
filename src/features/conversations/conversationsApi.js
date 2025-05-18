import apiSlice from "../api/apiSlice";
import messagesApi from "../messages/messagesApi";

const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (email) =>
        `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
    }),
    getConversation: builder.query({
      query: ({ userEmail, participantEmail }) =>
        `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
    }),
    addConversations: builder.mutation({
      query: (data) => ({
        url: "/conversations",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;

        if (result?.data?.id) {
          const users = args.data.users;
          const senderUser = users.find((user) => user.email === args.sender);
          const receiverUser = users.find((user) => user.email !== args.sender);
          dispatch(
            messagesApi.endpoints.addMessage.initiate({
              conversationId: result?.data?.id,
              message: args?.message,
              sender: senderUser,
              receiver: receiverUser,
              timestamp: new Date().getTime(),
            })
          );
        }
      },
    }),
    editConversations: builder.mutation({
      query: ({ id, data }) => ({
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;

        if (result?.data?.id) {
          const users = args.data.users;
          const senderUser = users.find((user) => user.email === args.sender);
          const receiverUser = users.find((user) => user.email !== args.sender);
          dispatch(
            messagesApi.endpoints.addMessage.initiate({
              conversationId: result?.data?.id,
              message: args?.message,
              sender: senderUser,
              receiver: receiverUser,
              timestamp: new Date().getTime(),
            })
          );
        }
      },
    }),
  }),
});

export const {
  useAddConversationsMutation,
  useEditConversationsMutation,
  useGetConversationsQuery,
} = conversationsApi;
