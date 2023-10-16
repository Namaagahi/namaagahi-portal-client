"use client"
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../config/api-config/apiSlice"
import { ChatroomObject } from "@/app/lib/interfaces"

/* This API Slice is for:
    * Getting All Chatrooms from databse
    * Creating a new chatroom
    * Deleting an existing chatroom
*/

const chatroomAdapter = createEntityAdapter({})
const initialState = chatroomAdapter.getInitialState()
const chatroomApiSliceTag: any = apiSlice.enhanceEndpoints({addTagTypes: ['Chatroom']})

export const chatroomsApiSlice = chatroomApiSliceTag.injectEndpoints({ 

    overrideExisting: module.hot?.status() === "apply",

    endpoints: (builder: any) => ({

        getAllChatrooms: builder.query({
            
            query: () => '/chatrooms',

            transformResponse: (responseData: ChatroomObject[]) => {
                const loadedChatrooms = responseData.map((chatroom: ChatroomObject) => {
                    chatroom.id = chatroom._id
                    return chatroom
                })
                return chatroomAdapter.setAll(initialState, loadedChatrooms)
            },

            providesTags: (result: any, error: any, arg: any ) => { 
                if (result?.ids) {
                    return [
                        { type: 'Chatroom', id: 'LIST' },
                        ...result.ids.map((id: string) => ({ type: 'Chatroom', id }))
                    ]
                } else return [{ type: 'Chatroom', id: 'LIST' }]
            }
        }),

        createNewChatroom: builder.mutation({ 

            query: (initialChatroom: any) => (
                {
                url: '/chatrooms',
                method: 'POST',
                body: { ...initialChatroom }
            }),

            invalidatesTags: [{ type: 'Chatroom', id:'LIST' }]
        }),

        deleteChatroom: builder.mutation({

            query:({ id } : { id: string}) => ({
                url: '/chatrooms',
                method: 'DELETE',
                body: { id }
            }),

            invalidatesTags: (result:any, error:any, arg:any) => [{ type: 'Chatroom', id: arg.id }]
        })
    }),
})

export const { useGetAllChatroomsQuery, useCreateNewChatroomMutation, useDeleteChatroomMutation } = chatroomsApiSlice

export const selectChatroomsResult = chatroomsApiSlice.endpoints.getAllChatrooms.select(undefined)

const selectChatroomsData = createSelector(
    selectChatroomsResult,
    chatroomsResult => chatroomsResult.data 
)

export const {
    selectAll: selectAllChatrooms,
    selectById: selectChatroomById,
    selectIds: selectChatroomIds
} = chatroomAdapter.getSelectors((state: any) => selectChatroomsData(state) ?? initialState)