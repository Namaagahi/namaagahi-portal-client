import { setupListeners } from "@reduxjs/toolkit/dist/query"
import authReducer from '../../apiSlices/authSlice'
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "../api-config/apiSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware), 
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch)