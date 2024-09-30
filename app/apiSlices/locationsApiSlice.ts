"use client";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../config/api-config/apiSlice";
import { locationObject } from "@/app/lib/interfaces";

/* This API Slice is for:
 * Getting All locations from databse
 * Creating a new location
 * Updating an existing location
 * Deleting an existing location
 */

const locationsAdapter = createEntityAdapter({
  sortComparer: (a: locationObject, b: locationObject) =>
    a.createdAt === b.createdAt ? 0 : a.createdAt ? 1 : -1,
});
const initialState = locationsAdapter.getInitialState();
const locationsApiSliceTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["Location"],
});

export const locationsApiSlice = locationsApiSliceTag.injectEndpoints({
  overrideExisting: module.hot?.status() === "apply",

  endpoints: (builder) => ({
    getLocations: builder.query({
      query: () => "/locations",

      transformResponse: (responseData: locationObject[]) => {
        const loadedLocations = responseData.map((location: locationObject) => {
          location.id = location._id;
          return location;
        });
        return locationsAdapter.setAll(initialState, loadedLocations);
      },

      providesTags: (result: any, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Location", id: "LIST" },
            ...result.ids.map((id: string) => ({ type: "Location", id })),
          ];
        } else return [{ type: "Location", id: "LIST" }];
      },
    }),

    addNewLocation: builder.mutation({
      query: (initialStructure) => ({
        url: "/locations",
        method: "POST",
        body: { ...initialStructure },
      }),

      invalidatesTags: [{ type: "Location", id: "LIST" }],
    }),

    updateLocation: builder.mutation({
      query: (initialLocation) => ({
        url: "/locations",
        method: "PATCH",
        body: { ...initialLocation },
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "Location", id: arg.id },
      ],
    }),

    deleteLocation: builder.mutation({
      query: ({ id }) => ({
        url: "/locations",
        method: "DELETE",
        body: { id },
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "Location", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useAddNewLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = locationsApiSlice;

export const selectLocationsResult =
  locationsApiSlice.endpoints.getLocations.select(undefined);

const selectLocationsData = createSelector(
  selectLocationsResult,
  (locationsResult) => locationsResult.data
);

export const {
  selectAll: selectAllLocations,
  selectById: selectLocationById,
  selectIds: selectLocationIds,
} = locationsAdapter.getSelectors(
  (state: any) => selectLocationsData(state) ?? initialState
);
