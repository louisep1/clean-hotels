import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import roomService from './roomService'

const initialState = {
  searchResults: null,
  isLoading: false,
  isSuccess: true,
  isError: false,
  message: '',
}

export const searchRooms = createAsyncThunk(
  '/searchRooms',
  async (searchParams, thunkAPI) => {
    try {
      const rooms = await roomService.searchRooms(searchParams)

      // SINGLE ROOM:
      const allSingleResults = rooms.filter(room => room.type === 'single')

      let singleCount = 0
      let currentSingleRoom = ''

      allSingleResults.map(result => {
        if (singleCount === searchParams.nights) return
        if (result.id !== currentSingleRoom) {
          currentSingleRoom = result.id
          singleCount = 1
          return
        }
        if (result.id === currentSingleRoom) {
          singleCount += 1
          return
        }
      })

      const singleResult = allSingleResults.filter(
        result => result.id === currentSingleRoom
      )

      // DOUBLE ROOM:
      const allDoubleResults = rooms.filter(room => room.type === 'double')

      let doubleCount = 0
      let currentDoubleRoom = ''

      allDoubleResults.map(result => {
        if (doubleCount === searchParams.nights) return
        if (result.id !== currentDoubleRoom) {
          currentDoubleRoom = result.id
          doubleCount = 1
          return
        }
        if (result.id === currentDoubleRoom) {
          doubleCount += 1
          return
        }
      })

      const doubleResult = allDoubleResults.filter(
        result => result.id === currentDoubleRoom
      )

      return { single: singleResult, double: doubleResult }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      console.log('Error')
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const reserveRoom = createAsyncThunk(
  '/api/rooms/reserve',
  async (reservedDates, thunkAPI) => {
    try {
      return await roomService.reserveRoom(reservedDates)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
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

      .addCase(reserveRoom.pending, state => {
        state.isLoading = true
      })
      .addCase(reserveRoom.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(reserveRoom.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export const { reset } = roomSlice.actions
export default roomSlice.reducer
