import { configureStore } from '@reduxjs/toolkit'
import roomsReducer from '../features/rooms/roomSlice'
import bookingReducer from '../features/booking/bookingSlice'

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    booking: bookingReducer,
  },
})
