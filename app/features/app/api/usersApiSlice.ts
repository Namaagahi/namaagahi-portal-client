"use client"
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()