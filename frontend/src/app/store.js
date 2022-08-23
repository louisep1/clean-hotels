import { configureStore } from '@reduxjs/toolkit'
import roomsReducer from '../features/rooms/roomSlice'

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
  },
})
