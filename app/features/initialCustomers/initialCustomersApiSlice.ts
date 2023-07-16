"use client"
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../config/api-config/apiSlice"
import { InitialCustomerObject } from "@/app/lib/interfaces"

/* This API Slice is for:
    * Getting All InitialCustomers from databse
    * Creating a new initialCustomer
    * Deleting an existing initialCustomer
*/

const initialCustomerAdapter = createEntityAdapter({})
const initialState = initialCustomerAdapter.getInitialState()
const initialCustomerApiSliceTag: any = apiSlice.enhanceEndpoints({addTagTypes: ['InitialCustomer']})

export const initialCustomersApiSlice = initialCustomerApiSliceTag.injectEndpoints({ 

    overrideExisting: module.hot?.status() === "apply",

    endpoints: (builder: any) => ({

        getAllInitialCustomers: builder.query({
            
            query: () => '/initialCustomers',

            transformResponse: (responseData: InitialCustomerObject[]) => {
                const loadedInitialCustomers = responseData.map((initialCustomer: InitialCustomerObject) => {
                    initialCustomer.id = initialCustomer._id
                    return initialCustomer
                })
                return initialCustomerAdapter.setAll(initialState, loadedInitialCustomers)
            },

            providesTags: (result: any, error: any, arg: any ) => { 
                if (result?.ids) {
                    return [
                        { type: 'InitialCustomer', id: 'LIST' },
                        ...result.ids.map((id: string) => ({ type: 'InitialCustomer', id }))
                    ]
                } else return [{ type: 'InitialCustomer', id: 'LIST' }]
            }
        }),

        createNewInitialCustomer: builder.mutation({ 

            query: (initialBox: any) => (
                {
                url: '/initialCustomers',
                method: 'POST',
                body: { ...initialBox }
            }),

            invalidatesTags: [{ type: 'InitialCustomer', id:'LIST' }]
        }),

        deleteInitialCustomer: builder.mutation({

            query:({ id } : { id: string}) => ({
                url: '/initialCustomers',
                method: 'DELETE',
                body: { id }
            }),

            invalidatesTags: (result:any, error:any, arg:any) => [{ type: 'InitialCustomer', id: arg.id }]
        })
    }),
})

export const { useGetAllInitialCustomersQuery, useCreateNewInitialCustomerMutation, useDeleteInitialCustomerMutation } = initialCustomersApiSlice

export const selectInitialCustomersResult = initialCustomersApiSlice.endpoints.getAllInitialCustomers.select(undefined)

const selectInitialCustomersData = createSelector(
    selectInitialCustomersResult,
    initialCustomersResult => initialCustomersResult.data 
)

export const {
    selectAll: selectAllInitialCustomers,
    selectById: selectInitialCustomerById,
    selectIds: selectInitialCustomerIds
} = initialCustomerAdapter.getSelectors((state: any) => selectInitialCustomersData(state) ?? initialState)
