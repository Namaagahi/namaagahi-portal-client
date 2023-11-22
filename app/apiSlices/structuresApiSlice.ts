"use client"
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../config/api-config/apiSlice"
import { StructureObject } from "@/app/lib/interfaces"

/* This API Slice is for:
  * Getting All Structures from databse
  * Creating a new structure
  * Updating an existing structure
  * Deleting an existing structure
*/

const structuresAdapter = createEntityAdapter({
  sortComparer: (a: StructureObject, b: StructureObject) => (a.isAvailable === b.isAvailable) ? 0 : a.isAvailable ? 1 : -1
})
const initialState = structuresAdapter.getInitialState()
const structuresApiSliceTag = apiSlice.enhanceEndpoints({addTagTypes: ['Structure']})

export const structuresApiSlice = structuresApiSliceTag.injectEndpoints({

  overrideExisting: module.hot?.status() === "apply",

  endpoints: builder => ({

    getStructures: builder.query({

      query: () => '/structures',

      transformResponse: (responseData: StructureObject[]) => {
        const loadedStructures = responseData.map((structure: StructureObject) => {
          structure.id = structure._id
          return structure
        })
        return structuresAdapter.setAll(initialState, loadedStructures)
      },

      providesTags: (result: any, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Structure', id: 'LIST' },
            ...result.ids.map((id: string) => ({ type: 'Structure', id }))
          ]
        } else return [{ type: 'Structure', id: 'LIST' }]
      }
    }),

    addNewStructure: builder.mutation({

      query: initialStructure => ({
        url: '/structures',
        method: 'POST',
        body: { ...initialStructure }
      }),

      invalidatesTags: [{ type: 'Structure', id:'LIST' }]
    }),

    updateStructure: builder.mutation({

      query: initialStructure => ({
        url: '/structures',
        method: 'PATCH',
        body: { ...initialStructure }
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'Structure', id: arg.id }]
    }),

    deleteStructure: builder.mutation({

      query:({ id }) => ({
        url: '/structures',
        method: 'DELETE',
        body: { id }
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'Structure', id: arg.id }]
    })
  }),
})

export const { useGetStructuresQuery, useAddNewStructureMutation, useUpdateStructureMutation, useDeleteStructureMutation } = structuresApiSlice

export const selectStructuresResult = structuresApiSlice.endpoints.getStructures.select(undefined)

const selectStructuresData = createSelector(
  selectStructuresResult,
  structuresResult => structuresResult.data
)

export const {
  selectAll: selectAllStructures,
  selectById: selectStructureById,
  selectIds: selectStructureIds
} = structuresAdapter.getSelectors((state: any) => selectStructuresData(state) ?? initialState)
