import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { date } from "./reducers/dataReducer"

export const store = configureStore({
  
  reducer:{
    apiData: date.reducer
  }

})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>  
>