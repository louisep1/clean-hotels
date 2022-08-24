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
      // return await roomService.searchRooms(searchParams)

      const rooms = await roomService.searchRooms(searchParams)

      const single = rooms.filter(room => room.type === 'single')[0]
      const double = rooms.filter(room => room.type === 'double')[0]

      return single && double
        ? [single, double]
        : single
        ? [single]
        : double
        ? [double]
        : []

      // !!! maybe adjust this so that dates bit does not get returned into the state

      // const data = await roomService.searchRooms(searchParams)

      // // Number of nights:
      // let current = new Date(searchParams.checkIn)
      // const end = new Date(searchParams.checkOut)
      // const dateArray = []

      // while (current < end) {
      //   dateArray.push(new Date(current).toLocaleDateString('en-CA'))

      //   let newDate = current.setDate(current.getDate() + 1)
      //   current = new Date(newDate)
      // }

      // const nights = dateArray.length

      // console.log(data)

      // // group returned data by room:
      // // var groupBy = function (xs, key) {
      // //   return xs.reduce(function (rv, x) {
      // //     ;(rv[x[key]] = rv[x[key]] || []).push(x)
      // //     return rv
      // //   }, {})
      // // }

      // // const single = data.filter(item => item.type === 'single')
      // // console.log(single)

      // // const groupByRoom = data.reduce((group, item) => {
      // //   const { id } = item
      // //   group[id] = group[id] ?? []
      // //   group[id].push(item)
      // //   return group
      // // }, {})

      // const groupByType = data.reduce((group, item) => {
      //   const { type } = item
      //   group[type] = group[type] ?? []
      //   group[type].push(item)
      //   return group
      // }, {})

      // console.log(groupByType)

      // console.log(groupByType['single'][2])

      // return data

      // // // group returned data by room:
      // // var groupBy = function (xs, key) {
      // //   return xs.reduce(function (rv, x) {
      // //     ;(rv[x[key]] = rv[x[key]] || []).push(x)
      // //     return rv
      // //   }, {})
      // // }

      // // const rooms = groupBy(data, 'id')

      // // // console.log(rooms)
      // // // console.log(rooms[0])

      // // for (const room in rooms) {
      // //   console.log(room.length)
      // // }

      // // return rooms
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
