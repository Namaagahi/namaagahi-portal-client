import { apiSlice } from "@/app/config/api-config/apiSlice"
import { logOut } from "./authSlice"
import { QueryLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: {...credentials}
            })
        }),

        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const {data}=
                    await queryFulfilled
                    console.log(data)
                    dispatch(logOut(undefined))
                    dispatch(apiSlice.util.resetApiState())
                } catch (error) {
                    console.log(error)
                }
            }
        }),

        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET'
            }),

            async onQueryStart(arg: any, { dispath, quertFulfilled }: any) {
                try {
                    await quertFulfilled
                    dispath(logOut(undefined))
                    dispath(apiSlice.util.resetApiState())
                } catch (error) {
                    console.log(error)
                }
            } 
        })

    })
})

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } = authApiSlice