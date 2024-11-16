"use client";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../config/api-config/apiSlice";
import { GeneralProjectCodeObject } from "@/app/lib/interfaces";

/* This API Slice is for:
 * Getting all GeneralProjectCodes from database
 * Creating a new GeneralProjectCode
 * Updating an existing GeneralProjectCode
 * Deleting an existing GeneralProjectCode
 */

const generalProjectCodesAdapter = createEntityAdapter({});
const initialState = generalProjectCodesAdapter.getInitialState();
const generalProjectCodesApiSliceTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["GeneralProjectCode"],
});

export const generalProjectCodesApiSlice =
  generalProjectCodesApiSliceTag.injectEndpoints({
    overrideExisting: module.hot?.status() === "apply",

    endpoints: (builder) => ({
      getAllGeneralProjectCodes: builder.query({
        query: () => "/generalProjectCodes",

        transformResponse: (responseData: GeneralProjectCodeObject[]) => {
          const loadedGeneralProjectCodes = responseData.map(
            (generalProjectCode: GeneralProjectCodeObject) => {
              generalProjectCode.id = generalProjectCode._id;
              return generalProjectCode;
            }
          );
          return generalProjectCodesAdapter.setAll(
            initialState,
            loadedGeneralProjectCodes
          );
        },

        providesTags: (result: any, error, arg) => {
          if (result?.ids) {
            return [
              { type: "GeneralProjectCode", id: "LIST" },
              ...result.ids.map((id: string) => ({
                type: "GeneralProjectCode",
                id,
              })),
            ];
          } else return [{ type: "GeneralProjectCode", id: "LIST" }];
        },
      }),

      createNewGeneralProjectCode: builder.mutation({
        query: (initialGeneralProjectCode) => ({
          url: "/generalProjectCodes",
          method: "POST",
          body: { ...initialGeneralProjectCode },
        }),

        invalidatesTags: [{ type: "GeneralProjectCode", id: "LIST" }],
      }),

      updateGeneralProjectCode: builder.mutation({
        query: (initialGeneralProjectCode) => ({
          url: "/generalProjectCodes",
          method: "PATCH",
          body: { ...initialGeneralProjectCode },
        }),

        invalidatesTags: (result, error, arg) => [
          { type: "GeneralProjectCode", id: arg.id },
        ],
      }),

      deleteGeneralProjectCode: builder.mutation({
        query: ({ id }) => ({
          url: "/generalProjectCodes",
          method: "DELETE",
          body: { id },
        }),

        invalidatesTags: (result, error, arg) => [
          { type: "GeneralProjectCode", id: arg.id },
        ],
      }),
    }),
  });

export const {
  useGetAllGeneralProjectCodesQuery,
  useCreateNewGeneralProjectCodeMutation,
  useUpdateGeneralProjectCodeMutation,
  useDeleteGeneralProjectCodeMutation,
} = generalProjectCodesApiSlice;

export const selectGeneralProjectCodesResult =
  generalProjectCodesApiSlice.endpoints.getAllGeneralProjectCodes.select(
    undefined
  );

const selectGeneralProjectCodesData = createSelector(
  selectGeneralProjectCodesResult,
  (generalProjectCodesResult) => generalProjectCodesResult.data
);

export const {
  selectAll: selectAllGeneralProjectCodes,
  selectById: selectGeneralProjectCodeById,
  selectIds: selectGeneralProjectCodeIds,
} = generalProjectCodesAdapter.getSelectors(
  (state: any) => selectGeneralProjectCodesData(state) ?? initialState
);
