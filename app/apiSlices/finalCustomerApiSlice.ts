"use client"
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../config/api-config/apiSlice"
import { FinalCustomerObject } from "@/app/lib/interfaces"

/* This API Slice is for:
  * Getting All FinalCustomers from databse
  * Creating a new finalCustomer
  * Deleting an existing finalCustomer
*/

const finalCustomerAdapter = createEntityAdapter({})
const finalState = finalCustomerAdapter.getInitialState()
const finalCustomerApiSliceTag: any = apiSlice.enhanceEndpoints({addTagTypes: ['FinalCustomer']})

export const finalCustomersApiSlice = finalCustomerApiSliceTag.injectEndpoints({

  overrideExisting: module.hot?.status() === "apply",

  endpoints: (builder: any) => ({

    getAllFinalCustomers: builder.query({

      query: () => '/finalCustomers',

      transformResponse: (responseData: FinalCustomerObject[]) => {
        const loadedFinalCustomers = responseData.map((finalCustomer: FinalCustomerObject) => {
          finalCustomer.id = finalCustomer._id
          return finalCustomer
        })
        return finalCustomerAdapter.setAll(finalState, loadedFinalCustomers)
      },

      providesTags: (result: any, error: any, arg: any ) => {
        if (result?.ids) {
          return [
            { type: 'FinalCustomer', id: 'LIST' },
            ...result.ids.map((id: string) => ({ type: 'FinalCustomer', id }))
          ]
        } else return [{ type: 'FinalCustomer', id: 'LIST' }]
      }
    }),

    createNewFinalCustomer: builder.mutation({

      query: (finalCustomer: any) => ({
        url: '/finalCustomers',
        method: 'POST',
        body: { ...finalCustomer }
      }),

      invalidatesTags: [{ type: 'FinalCustomer', id:'LIST' }]
    }),

    updateFinalCustomer: builder.mutation({

      query: (initialFinalCustomer: any) => ({
        url: '/finalCustomers',
        method: 'PATCH',
        body: { ...initialFinalCustomer }
      }),

      invalidatesTags: (result: any, error: any, arg: any) => [{ type: 'FinalCustomer', id: arg.id }]
    }),

    deleteFinalCustomer: builder.mutation({

      query:({ id } : { id: string}) => ({
        url: '/finalCustomers',
        method: 'DELETE',
        body: { id }
      }),

      invalidatesTags: (result:any, error:any, arg:any) => [{ type: 'FinalCustomer', id: arg.id }]
    })
  }),
})

export const { useGetAllFinalCustomersQuery, useCreateNewFinalCustomerMutation, useUpdateFinalCustomerMutation, useDeleteFinalCustomerMutation } = finalCustomersApiSlice

export const selectFinalCustomersResult = finalCustomersApiSlice.endpoints.getAllFinalCustomers.select(undefined)

const selectFinalCustomersData = createSelector(
  selectFinalCustomersResult,
  finalCustomersResult => finalCustomersResult.data
)

export const {
  selectAll: selectAllFinalCustomers,
  selectById: selectFinalCustomerById,
  selectIds: selectFinalCustomerIds
} = finalCustomerAdapter.getSelectors((state: any) => selectFinalCustomersData(state) ?? finalState)
