"use client"
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../config/api-config/apiSlice"
import { BoxObject } from "@/app/lib/interfaces"

/* This API Slice is for:
    * Getting All Boxes from databse
    * Creating a new box
    * Updating an existing box
    * Deleting an existing box
*/

const boxesAdapter = createEntityAdapter({})
const initialState = boxesAdapter.getInitialState()
const boxesApiSliceTag = apiSlice.enhanceEndpoints({addTagTypes: ['Box']})

export const boxesApiSlice = boxesApiSliceTag.injectEndpoints({ 

    overrideExisting: module.hot?.status() === "apply",
    
    endpoints: (builder) => ({

        getAllBoxes: builder.query({
    
          query: () => '/boxes',
    
          transformResponse: (responseData: BoxObject[]) => {
            const loadedBoxes = responseData.map((box: BoxObject) => {
              box.id = box._id
              return box
            })
            return boxesAdapter.setAll(initialState, loadedBoxes)
          },
    
          providesTags: (result: any, error, arg) => {
            if (result?.ids) {
              return [
                { type: 'Box', id: 'LIST' },
                ...result.ids.map((id: string) => ({ type: 'Box', id }))
              ]
            } else return [{ type: 'Box', id: 'LIST' }]
          }
        }),
    
        createNewBox: builder.mutation({
    
          query: initialBox => (
            {
              url: '/boxes',
              method: 'POST',
              body: { ...initialBox }
            }),
    
          invalidatesTags: [{ type: 'Box', id: 'LIST' }]
        }),
    
        updateBox: builder.mutation({
    
          query: initialBox => ({
            url: 'boxes',
            method: 'PATCH',
            body: { ...initialBox }
          }),
    
          invalidatesTags: (result, error, arg) => [{ type: 'Box', id: arg.id, boxId: arg.boxId }]
        }),
    
        deleteBox: builder.mutation({
    
          query: ({ id, boxId }) => ({
            url: '/boxes',
            method: 'DELETE',
            body: { id, boxId }
          }),
    
          invalidatesTags: (result, error, arg) => [{ type: 'Box', id: arg.id, boxId: arg.boxId }]
        }),
    
        getBoxById: builder.query({

            query: (id: string) => ({
              url: `/boxes/${id}`,
              refetchOnMountOrArgChange: 5
            }),
            keepUnusedDataFor: 0,
            
            transformResponse: (responseData: BoxObject) => {
              responseData.id = responseData._id
              return boxesAdapter.upsertOne(initialState, responseData)
            },
      
            providesTags: (result, error, id, boxVersion) => [{ type: 'Box', id, boxVersion }],

          })
      }),
    })
 
export const { useGetAllBoxesQuery, useCreateNewBoxMutation, useUpdateBoxMutation, useDeleteBoxMutation, useGetBoxByIdQuery } = boxesApiSlice

export const selectBoxesResult = boxesApiSlice.endpoints.getAllBoxes.select(undefined)

const selectBoxesData = createSelector(
    selectBoxesResult,
    boxesResult => boxesResult.data 
)

export const {
    selectAll: selectAllBoxes,
    selectById: selectBoxById,
    selectIds: selectBoxIds
} = boxesAdapter.getSelectors((state: any) => selectBoxesData(state) ?? initialState)