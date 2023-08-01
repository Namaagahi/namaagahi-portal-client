"use client"
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../config/api-config/apiSlice"
import { PlanObject } from "@/app/lib/interfaces"

/* This API Slice is for:
    * Getting All Plans from databse
    * Creating a new plan
    * Updating an existing plan
    * Deleting an existing plan
*/
 
const plansAdapter = createEntityAdapter({})
const initialState = plansAdapter.getInitialState()
const plansApiSliceTag = apiSlice.enhanceEndpoints({addTagTypes: ['Plan']})

export const plansApiSlice = plansApiSliceTag.injectEndpoints({ 

    overrideExisting: module.hot?.status() === "apply",

    endpoints: (builder) => ({

        getAllPlans: builder.query({
            
            query: () => '/plans',

            transformResponse: (responseData: PlanObject[]) => {
                const loadedPlans = responseData.map((plan: PlanObject) => {
                    plan.id = plan._id
                    return plan
                })
                return plansAdapter.setAll(initialState, loadedPlans)
            },

            providesTags: (result: any, error, arg) => { 
                if (result?.ids) {
                    return [
                        { type: 'Plan', id: 'LIST' },
                        ...result.ids.map((id: string) => ({ type: 'Plan', id }))
                    ]
                } else return [{ type: 'Plan', id: 'LIST' }]
            }
        }),

        createNewPlan: builder.mutation({ 

            query: initialPlan => (
                {
                url: '/plans',
                method: 'POST',
                body: { ...initialPlan }
            }),

            invalidatesTags: [{ type: 'Plan', id:'LIST' }]
        }),

        updatePlan: builder.mutation({

            query: initialPlan => (
                {
                url: '/plans',
                method: 'PATCH',
                body: { ...initialPlan }
            }),

            invalidatesTags: (result, error, arg) => [{ type: 'Plan', id: arg.id }]
        }),

        deletePlan: builder.mutation({

            query:({ id }) => ({
                url: '/plans',
                method: 'DELETE',
                body: { id }
            }),
            
            invalidatesTags: (result, error, arg) => [{ type: 'Plan', id: arg.id }]
        }) 
    }),
})

export const { useGetAllPlansQuery, useCreateNewPlanMutation, useUpdatePlanMutation, useDeletePlanMutation } = plansApiSlice

export const selectPlansResult = plansApiSlice.endpoints.getAllPlans.select(undefined)

const selectPlansData = createSelector(
    selectPlansResult,
    plansResult => plansResult.data 
)

export const {
    selectAll: selectAllPlans,
    selectById: selectPlanById,
    selectIds: selectPlanIds
} = plansAdapter.getSelectors((state: any) => selectPlansData(state) ?? initialState)