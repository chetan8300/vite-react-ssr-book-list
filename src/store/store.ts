import { Tuple, configureStore } from '@reduxjs/toolkit'
import type { Reducer } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import bookSlice from './bookSlice'

export const store = configureStore({
  reducer: {
    book: bookSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch