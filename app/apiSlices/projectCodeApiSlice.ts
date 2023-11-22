"use client"
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../config/api-config/apiSlice"
import { ProjectCodeObject } from "@/app/lib/interfaces"

/* This API Slice is for:
  * Getting All ProjectCodes from databse
  * Creating a new projectCode
  * Updating an existing projectCode
  * Deleting an existing projectCode
*/

const projectCodesAdapter = createEntityAdapter({})
const initialState = projectCodesAdapter.getInitialState()
const projectCodesApiSliceTag = apiSlice.enhanceEndpoints({addTagTypes: ['ProjectCode']})

export const projectCodesApiSlice = projectCodesApiSliceTag.injectEndpoints({

  overrideExisting: module.hot?.status() === "apply",

  endpoints: (builder) => ({

    getAllProjectCodes: builder.query({

      query: () => '/projectCodes',

      transformResponse: (responseData: ProjectCodeObject[]) => {
        const loadedProjectCodes = responseData.map((projectCode: ProjectCodeObject) => {
          projectCode.id = projectCode._id
          return projectCode
        })
        return projectCodesAdapter.setAll(initialState, loadedProjectCodes)
      },

      providesTags: (result: any, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'ProjectCode', id: 'LIST' },
            ...result.ids.map((id: string) => ({ type: 'ProjectCode', id }))
          ]
        } else return [{ type: 'ProjectCode', id: 'LIST' }]
      }
    }),

    createNewProjectCode: builder.mutation({

      query: initialProjectCode => ({
        url: '/projectCodes',
        method: 'POST',
        body: { ...initialProjectCode }
      }),

      invalidatesTags: [{ type: 'ProjectCode', id:'LIST' }]
    }),

    updateProjectCode: builder.mutation({

      query: initialProjectCode => ({
        url: '/projectCodes',
        method: 'PATCH',
        body: { ...initialProjectCode }
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'ProjectCode', id: arg.id }]
    }),

    deleteProjectCode: builder.mutation({

      query:({ id }) => ({
        url: '/projectCodes',
        method: 'DELETE',
        body: { id }
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'ProjectCode', id: arg.id }]
    })
  }),
})

export const { useGetAllProjectCodesQuery, useCreateNewProjectCodeMutation, useUpdateProjectCodeMutation, useDeleteProjectCodeMutation } = projectCodesApiSlice

export const selectProjectCodesResult = projectCodesApiSlice.endpoints.getAllProjectCodes.select(undefined)

const selectProjectCodesData = createSelector(
  selectProjectCodesResult,
  projectCodesResult => projectCodesResult.data
)

export const {
  selectAll: selectAllProjectCodes,
  selectById: selectProjectCodeById,
  selectIds: selectProjectCodeIds
} = projectCodesAdapter.getSelectors((state: any) => selectProjectCodesData(state) ?? initialState)
