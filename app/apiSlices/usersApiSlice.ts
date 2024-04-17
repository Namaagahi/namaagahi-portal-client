"use client";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../config/api-config/apiSlice";
import { UserObject } from "@/app/lib/interfaces";

/* This API Slice is for:
 * Getting All Users from databse
 * Creating a new user
 * Updating an existing user
 * Deleting an existing user
 */

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();
const usersApiSliceTag = apiSlice.enhanceEndpoints({ addTagTypes: ["User"] });

export const usersApiSlice = usersApiSliceTag.injectEndpoints({
  overrideExisting: module.hot?.status() === "apply",

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",

      transformResponse: (responseData: UserObject[]) => {
        const loadedUsers = responseData.map((user: UserObject) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },

      providesTags: (result: any, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id: string) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),

    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "POST",
        body: { ...initialUserData },
      }),

      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    updateUser: builder.mutation({
      query: (formData) => ({
        url: "/users",
        method: "PATCH",
        body: formData,
        prepareHeaders: (headers: any) => {
          headers.set("Content-Type", "multipart/form-data");
          return headers;
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),

    deleteUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "PATCH",
        body: { ...initialUserData },
      }),

      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    sendEmailToUser: builder.mutation({
      query: (userIds: string[]) => ({
        url: `/send-email`,
        method: "POST",
        body: { userIds },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useSendEmailToUserMutation,
} = usersApiSlice;

export const selectUsersResult =
  usersApiSlice.endpoints.getUsers.select(undefined);

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(
  (state: any) => selectUsersData(state) ?? initialState
);
