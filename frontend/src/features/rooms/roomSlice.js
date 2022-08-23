import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import roomService from './roomService'

const initialState = {
  searchResults: [],
  isLoading: false,
  isSuccess: true,
  isError: false,
  message: '',
}

export const searchRooms = createAsyncThunk(
  '/searchRooms',
  async (searchParams, thunkAPI) => {
    try {
      return await roomService.searchRooms(searchParams)
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

export const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = false
    },
  },

  extraReducers: builder => {
    builder
      .addCase(searchRooms.pending, state => {
        state.isLoading = true
      })
      .addCase(searchRooms.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.searchResults = action.payload
      })
      .addCase(searchRooms.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

    // to be continued....
  },
})

export const { reset } = roomSlice.actions
export default roomSlice.reducer
