import { RootState } from "@/app/config/state-config/store"
import { createSlice } from "@reduxjs/toolkit"
// import { GlobalState } from "@/app/lib/interfaces"

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },

     reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.token = null
        }
     }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: RootState) => state.auth.token