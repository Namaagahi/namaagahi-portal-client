"use client";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../config/api-config/apiSlice";
import { AssetObject, StructureObject } from "@/app/lib/interfaces";

/* This API Slice is for:
 * Getting All assets from databse
 * Creating a new asset
 * Updating an existing asset
 * Deleting an existing asset
 */

const itAssetsAdapter = createEntityAdapter({
  sortComparer: (a: AssetObject, b: AssetObject) =>
    a.createdAt === b.createdAt ? 0 : a.createdAt ? 1 : -1,
});
const initialState = itAssetsAdapter.getInitialState();
const itAssetsApiSliceTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["ITasset"],
});

export const itAssetsApiSlice = itAssetsApiSliceTag.injectEndpoints({
  overrideExisting: module.hot?.status() === "apply",

  endpoints: (builder) => ({
    getITassets: builder.query({
      query: () => "/itAssets",

      transformResponse: (responseData: AssetObject[]) => {
        const loadedITassets = responseData.map((asset: AssetObject) => {
          asset.id = asset._id;
          return asset;
        });
        return itAssetsAdapter.setAll(initialState, loadedITassets);
      },

      providesTags: (result: any, error, arg) => {
        if (result?.ids) {
          return [
            { type: "ITasset", id: "LIST" },
            ...result.ids.map((id: string) => ({ type: "ITasset", id })),
          ];
        } else return [{ type: "ITasset", id: "LIST" }];
      },
    }),

    addNewAsset: builder.mutation({
      query: (initialStructure) => ({
        url: "/itAssets",
        method: "POST",
        body: { ...initialStructure },
      }),

      invalidatesTags: [{ type: "ITasset", id: "LIST" }],
    }),

    updateAsset: builder.mutation({
      query: (initialAsset) => ({
        url: "/itAssets",
        method: "PATCH",
        body: { ...initialAsset },
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "ITasset", id: arg.id },
      ],
    }),

    deleteAsset: builder.mutation({
      query: ({ id }) => ({
        url: "/itAssets",
        method: "DELETE",
        body: { id },
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "ITasset", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetITassetsQuery,
  useAddNewAssetMutation,
  useUpdateAssetMutation,
  useDeleteAssetMutation,
} = itAssetsApiSlice;

export const selectAssetsResult =
  itAssetsApiSlice.endpoints.getITassets.select(undefined);

const selectAssetsData = createSelector(
  selectAssetsResult,
  (assetsResult) => assetsResult.data
);

export const {
  selectAll: selectAllAssets,
  selectById: selectAssetById,
  selectIds: selectAssetIds,
} = itAssetsAdapter.getSelectors(
  (state: any) => selectAssetsData(state) ?? initialState
);
