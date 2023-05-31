import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "../api-config/apiSlice"
import authReducer from '../../features/auth/authSlice'

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