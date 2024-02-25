import { configureStore } from '@reduxjs/toolkit'
import deviceSlice from './device/deviceSlice'
import projectSlice from './project/projectSlice'
import userSlice from './user/userSlice'

export const store = configureStore({
	reducer: {
		users: userSlice,
		devices: deviceSlice,
		projects: projectSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
