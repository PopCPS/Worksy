import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { IStates, agenda } from "../../lib/global-states-interface";
import dayjs from "dayjs";

const initialState: IStates = {
  day: Number(dayjs().format('D')),
  month: Number(dayjs().format('M')),
  agendas: null,
  isNavOpen: true,
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
    },
    set_agendas: (state, action: PayloadAction<agenda[]>) => {
      state.agendas = action.payload
    },
    set_isNavOpen: (state, action: PayloadAction<boolean>) => {
      state.isNavOpen = action.payload
    }
  }
})

export const {
  set_day,
  set_month,
  set_agendas,
  set_isNavOpen
} = date.actions

export default date.reducer