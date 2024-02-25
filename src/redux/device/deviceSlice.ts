import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Device {
	deviceId: number
	projectId: number
	serialNumber: string
	id: string
}

interface DeviceState {
	items: Device[]
	loading: boolean
	error: string | null
}

const initialState: DeviceState = {
	items: [],
	loading: false,
	error: null,
}

export const fetchDevices = createAsyncThunk(
	'devices/fetchDevices',
	async () => {
		const response = await axios.get('http://localhost:4200/devices')
		return response.data
	}
)

const deviceSlice = createSlice({
	name: 'devices',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchDevices.pending, state => {
				state.loading = true
			})
			.addCase(fetchDevices.fulfilled, (state, action) => {
				state.loading = false
				state.items = action.payload
				state.error = null
			})
			.addCase(fetchDevices.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message ?? 'An error occurred'
			})
	},
})

export default deviceSlice.reducer
