"use client"
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../config/api-config/apiSlice"
import { NoteObject } from "@/app/lib/interfaces"

/* This API Slice is for:
    * Getting All Notes from databse
    * Creating a new note
    * Updating an existing note
    * Deleting an existing note
*/

const notesAdapter = createEntityAdapter({
    sortComparer: (a: NoteObject, b: NoteObject) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})
const initialState = notesAdapter.getInitialState()
const notesApiSliceTag = apiSlice.enhanceEndpoints({addTagTypes: ['Note']})

export const notesApiSlice = notesApiSliceTag.injectEndpoints({

    overrideExisting: module.hot?.status() === "apply",

    endpoints: builder => ({

        getNotes: builder.query({

            query: () => '/notes',

            transformResponse: (responseData: NoteObject[]) => {
                const loadedNotes = responseData.map((note: NoteObject) => {
                    note.id = note._id
                    return note
                })
                return notesAdapter.setAll(initialState, loadedNotes)
            },

            providesTags: (result: any, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Note', id: 'LIST' },
                        ...result.ids.map((id: string) => ({ type: 'Note', id }))
                    ]
                } else return [{ type: 'Note', id: 'LIST' }]
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
 
export const { useGetNotesQuery, useAddNewNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } = notesApiSlice

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select(undefined)

const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data 
)

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
} = notesAdapter.getSelectors((state: any) => selectNotesData(state) ?? initialState)