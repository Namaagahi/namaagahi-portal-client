"use client";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../config/api-config/apiSlice";
import { ProposalObject } from "@/app/lib/interfaces";

/* This API Slice is for:
 * Getting All Proposals from databse
 * Creating a new proposal
 * Deleting an existing proposal
 */

const proposalAdapter = createEntityAdapter({});
const finalState = proposalAdapter.getInitialState();
const proposalApiSliceTag: any = apiSlice.enhanceEndpoints({
  addTagTypes: ["Proposal"],
});

export const proposalsApiSlice = proposalApiSliceTag.injectEndpoints({
  overrideExisting: module.hot?.status() === "apply",

  endpoints: (builder: any) => ({
    getAllProposals: builder.query({
      query: () => "/proposals",

      transformResponse: (responseData: ProposalObject[]) => {
        const loadedProposals = responseData.map((proposal: ProposalObject) => {
          proposal.id = proposal._id;
          return proposal;
        });
        return proposalAdapter.setAll(finalState, loadedProposals);
      },

      providesTags: (result: any, error: any, arg: any) => {
        if (result?.ids) {
          return [
            { type: "Proposal", id: "LIST" },
            ...result.ids.map((id: string) => ({ type: "Proposal", id })),
          ];
        } else return [{ type: "Proposal", id: "LIST" }];
      },
    }),

    createNewProposal: builder.mutation({
      query: (proposal: any) => ({
        url: "/proposals",
        method: "POST",
        body: { ...proposal },
      }),

      invalidatesTags: [{ type: "Proposal", id: "LIST" }],
    }),
    updateProposal: builder.mutation({
      query: (proposal: any) => ({
        url: "/proposals",
        method: "PATCH",
        body: { ...proposal },
      }),

      invalidatesTags: [{ type: "Proposal", id: "LIST" }],
    }),

    deleteProposal: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: "/proposals",
        method: "DELETE",
        body: { id },
      }),

      invalidatesTags: (result: any, error: any, arg: any) => [
        { type: "Proposal", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetAllProposalsQuery,
  useCreateNewProposalMutation,
  useDeleteProposalMutation,
  useUpdateProposalMutation,
} = proposalsApiSlice;

export const selectProposalsResult =
  proposalsApiSlice.endpoints.getAllProposals.select(undefined);

const selectProposalsData = createSelector(
  selectProposalsResult,
  (proposalsResult) => proposalsResult.data
);

export const {
  selectAll: selectAllProposals,
  selectById: selectProposalById,
  selectIds: selectProposalIds,
} = proposalAdapter.getSelectors(
  (state: any) => selectProposalsData(state) ?? finalState
);
