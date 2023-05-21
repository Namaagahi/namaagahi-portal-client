// import { createSlice } from "@reduxjs/toolkit"
// import { RootState } from "../../state & api/store"
// import { GlobalState } from "@/app/lib/interfaces"

// const initialState: GlobalState = { 
//     user: null,
//     token: null
//  }

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,

//      reducers: {
//         setCredentials: (state, action) => {
//             const { foundUser, accessToken } = action.payload
//             state.user = foundUser
//             state.token = accessToken
//         },
//         logOut: (state, action) => {
//             state.user = null
//             state.token = null
//         }
//      }
// })

// export const { setCredentials, logOut } = authSlice.actions

// export default authSlice.reducer

// export const selectCurrentUser = (state: RootState) => state.auth.user
// export const selectCurrentToken = (state: RootState) => state.auth.token