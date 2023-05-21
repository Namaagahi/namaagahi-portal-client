"use client"
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { NoteObject } from "@/app/lib/interfaces"
import { apiSlice } from "./apiSlice"

const notesAdapter = createEntityAdapter({
    sortComparer: (a: NoteObject, b: NoteObject) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => '/notes',
            // validateStatus: (response, result) => {
            //     return response.status === 200 && !result.isError
            // },
            keepUnusedDataFor: 5,
            transformResponse: (responseData: NoteObject[]) => {
                const loadedNotes = responseData.map((note: NoteObject) => {
                    note.id = note._id
                    return note
                });
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
    }),
})

export const { useGetNotesQuery } = notesApiSlice

// returns the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

// creates memoized selector
const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
    // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors((state: any) => selectNotesData(state) ?? initialState)