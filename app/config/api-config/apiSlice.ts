"use client"
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '@/app/apiSlices/authSlice'
import { CustomError } from '@/app/lib/interfaces'
import { RootState } from '../state-config/store'

const baseQuery = fetchBaseQuery({ 
    // baseUrl: 'http://it-pc1.namagahi.co:3500',
    baseUrl: process.env.SERVER,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if(token) headers.set('authorization', `Bearer ${token}`)
        return headers
    }
}) as BaseQueryFn<string | FetchArgs, unknown, CustomError | undefined, {}>

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError | CustomError | undefined >= async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions) 
    if(result?.error?.status === 403) {
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if(refreshResult?.data) {
            api.dispatch(setCredentials({ ...refreshResult.data }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            if(refreshResult?.error?.status === 403) refreshResult.error.data.message = 'Your Login has expired'
            return refreshResult
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Note', 'User', 'Structure', 'Box'],
    endpoints: builder => ({})
})