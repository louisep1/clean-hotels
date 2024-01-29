import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bookingService from './bookingService'

const initialState = {
  booking: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

export const newBooking = createAsyncThunk(
  '/api/bookings/new',
  async (booking, thunkAPI) => {
    try {
      return await bookingService.newBooking(booking)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(newBooking.pending, state => {
        state.isLoading = true
      })
      .addCase(newBooking.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.booking = action.payload
      })
      .addCase(newBooking.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = bookingSlice.actions
export default bookingSlice.reducer
