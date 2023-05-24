"use client"
import { CustomError } from '@/app/lib/interfaces'
import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.SERVER }) as BaseQueryFn<string | FetchArgs, unknown, CustomError | undefined, {}>,
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})