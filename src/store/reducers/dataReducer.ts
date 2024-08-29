import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { IStates } from "../../lib/global-states-interface";
import dayjs from "dayjs";

const initialState: IStates = {
  day: Number(dayjs().format('D')),
  month: Number(dayjs().format('M'))
}

export const date = createSlice({
  name: "pageStates",
  initialState,
  reducers: {
    set_day: (state, action: PayloadAction<number>) => {
      state.day = action.payload
    },
    set_month: (state, action: PayloadAction<number>) => {
      state.month = action.payload
    }
  }
})

export const {
  set_day,
  set_month
} = date.actions

export default date.reducer