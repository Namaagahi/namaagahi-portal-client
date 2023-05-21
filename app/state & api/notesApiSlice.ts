"use client"
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../features/app/api/apiSlice"
import { Note } from "@/app/lib/interfaces"

const notesAdapter = createEntityAdapter({})

const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => '/notes',
            // validateStatus: (response, result) => return response.status === 200 && !result.isError,
            keepUnusedDataFor: 5,
            transformErrorResponse: (responseData : any) => {
                const loadednotes = responseData.map((note: Note) => {
                    note.id = note._id
                    return note
                })
                return notesAdapter.setAll(initialState, loadednotes)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        { type: 'note', id: 'LIST' },
                        ...result.ids.map((id: string) => ({ type: 'note', id }))
                    ]
                } else return [{ type: 'note', id: 'LIST' }]
            }
        })
    })
})

export const { useGetNotesQuery } = notesApiSlice

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

const selectNotesData = createSelector(
    selectNotesResult,
    noteResult => noteResult.data
)

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
} = notesAdapter.getSelectors((state: any) => selectNotesData(state) ?? initialState)