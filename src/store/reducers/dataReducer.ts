import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { IStates, agendas } from "../../lib/global-states-interface";
import dayjs from "dayjs";

const initialState: IStates = {
  day: Number(dayjs().format('D')),
  month: Number(dayjs().format('M')),
  agendas: null,
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
    set_agendas: (state, action: PayloadAction<agendas[]>) => {
      state.agendas = action.payload
    }
  }
})

export const {
  set_day,
  set_month,
  set_agendas
} = date.actions

export default date.reducer