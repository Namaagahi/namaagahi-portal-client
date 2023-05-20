"use client"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.SERVER }),
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})