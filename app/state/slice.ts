import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { RootState } from "./store";
import { GlobalState } from "../lib/interfaces";

const initialState: GlobalState = {
  currentUser: null,
};

export const thisSlice = createSlice({
  name: 'user slice',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
    removeCurrentUser: (state) => {
      state.currentUser = null
      new Cookies().remove("ut", {path: "/"})
    }
  }
})

export const { setCurrentUser, removeCurrentUser } = thisSlice.actions
export const selectUser = (state: RootState) => state.thisReducer.currentUser
export default thisSlice.reducer