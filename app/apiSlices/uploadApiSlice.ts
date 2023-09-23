"use client"
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../config/api-config/apiSlice"

/* This API Slice is for:
    * uploading images to the server
*/

const uploadAdapter = createEntityAdapter({})
const initialState = uploadAdapter.getInitialState() 
const uploadApiSliceTag = apiSlice.enhanceEndpoints({addTagTypes: ['Upload']})

export const uploadApiSlice = uploadApiSliceTag.injectEndpoints({

    overrideExisting: module.hot?.status() === "apply",

    endpoints: builder => ({

        upload: builder.mutation({

            query: initialUserData => ({
                url: '/upload-image',
                method: 'POST',
                body: { ...initialUserData }
            }),

            invalidatesTags: [{ type: 'Upload', id:'LIST' }]
        }),
    }),
})

export const { useUploadMutation } = uploadApiSlice