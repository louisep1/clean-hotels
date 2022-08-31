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
      const rooms = await roomService.searchRooms(searchParams)

      // const single = rooms.filter(room => room.type === 'single')[0]
      // const double = rooms.filter(room => room.type === 'double')[0]

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

      console.log({ single: singleResult, double: doubleResult })

      return { single: singleResult, double: doubleResult }

      // return [singleResult]

      // if (!currentSingleRoom) {
      //   console.log('No rooms')
      // }

      // if (currentSingleRoom) {
      //   console.log(`Current room number id: ${currentSingleRoom}`)
      // }

      // console.log(allDoubleResults)

      // return single && double
      //   ? [single, double]
      //   : single
      //   ? [single]
      //   : double
      //   ? [double]
      //   : []
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
