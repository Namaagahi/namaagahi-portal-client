import { RootState } from "@/app/config/state-config/store"
import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },

     reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            localStorage.setItem("CC_Token", accessToken)
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.token = null
            localStorage.removeItem("CC_Token")
        }
     }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: RootState) => state.auth.token