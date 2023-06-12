"use client"
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../config/api-config/apiSlice"
import { BoxObject } from "@/app/lib/interfaces"

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

        addNewNote: builder.mutation({

            query: initialNote => ({
                url: '/notes',
                method: 'POST',
                body: { ...initialNote }
            }),

            invalidatesTags: [{ type: 'Note', id:'LIST' }]
        }),

        updateNote: builder.mutation({

            query: initialNote => ({
                url: 'notes',
                method: 'PATCH',
                body: { ...initialNote }
            }),

            invalidatesTags: (result, error, arg) => [{ type: 'Note', id: arg.id }]
        }),

        deleteNote: builder.mutation({

            query:({ id }) => ({
                url: '/notes',
                method: 'DELETE',
                body: { id }
            }),

            invalidatesTags: (result, error, arg) => [{ type: 'Note', id: arg.id }]
        })
    }),
})
 
export const { useGetAllBoxesQuery, useAddNewNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } = boxesApiSlice

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