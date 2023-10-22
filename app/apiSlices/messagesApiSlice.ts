"use client"
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../config/api-config/apiSlice"
import { MessageObject } from "@/app/lib/interfaces"

/* This API Slice is for:
    * Getting All Messages from databse
    * Creating a new message
    * Updating an existing message
    * Deleting an existing message
*/
 
const messagesAdapter = createEntityAdapter({})
const initialState = messagesAdapter.getInitialState()
const messagesApiSliceTag = apiSlice.enhanceEndpoints({addTagTypes: ['Message']})

export const messagesApiSlice = messagesApiSliceTag.injectEndpoints({ 

    overrideExisting: module.hot?.status() === "apply",

    endpoints: (builder) => ({

        getAllMessages: builder.query({
            
            query: (page) => `/messages?page=${page}&direction=newer`,

            transformResponse: (responseData: MessageObject[]) => {
                const loadedMessages = responseData.map((message: MessageObject) => {
                    message.id = message._id
                    return message
                })
                return messagesAdapter.setAll(initialState, loadedMessages)
            },

            providesTags: (result: any, error, arg) => { 
                if (result?.ids) {
                    return [
                        { type: 'Message', id: 'LIST' },
                        ...result.ids.map((id: string) => ({ type: 'Message', id }))
                    ]
                } else return [{ type: 'Message', id: 'LIST' }]
            },

            serializeQueryArgs: ({ queryArgs }) => {
                const newQueryArgs = { ...queryArgs }
                if (newQueryArgs.page) {
                  delete newQueryArgs.page
                }
                return newQueryArgs
            },

            merge: (currentCache: any, newItems) => {
                if (currentCache.results) {
                  return {
                    ...currentCache,
                    ...newItems,
                    results: [...currentCache.results, ...newItems.results]
                  }
                }
                return newItems
            },


        }),
    }),
})

export const { useGetAllMessagesQuery } = messagesApiSlice

export const selectMessagesResult = messagesApiSlice.endpoints.getAllMessages.select(undefined)

const selectMessagesData = createSelector(
    selectMessagesResult,
    messagesResult => messagesResult.data 
)

export const {
    selectAll: selectAllMessages,
    selectById: selectMessageById,
    selectIds: selectMessageIds
} = messagesAdapter.getSelectors((state: any) => selectMessagesData(state) ?? initialState)