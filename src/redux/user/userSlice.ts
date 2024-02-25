import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
	createUser,
	deleteUser,
	editUser,
	fetchUsers,
	getUserById,
} from '../../utils/api'

export const fetchUsersAsync = createAsyncThunk('user/fetchUser', async () => {
	const response = await fetchUsers()
	return response
})

export const getUserByIdAsync = createAsyncThunk(
	'user/getUserById',
	async (userId: string) => {
		const response = await getUserById(userId)
		return response
	}
)

export const createUserAsync = createAsyncThunk(
	'user/createUser',
	async (userData: any) => {
		const response = await createUser(userData)
		return response
	}
)

export const editUserAsync = createAsyncThunk(
	'user/editUser',
	async ({
		userId,
		userData,
	}: {
		userId: number
		userData: User
	}) => {
		const response = await editUser(userId, userData)
		return response
	}
)

export const deleteUserAsync = createAsyncThunk(
	'user/deleteUser',
	async (userId: number) => {
		await deleteUser(userId)
		return userId
	}
)

export interface User {
	id: number
	projectId: number
	firstName: string
	lastName: string
	disabled: number
}

// TODO: вынести в types
export interface IEditUserAsync {
	firstName: string
	lastName: string
}

interface UserState {
	items: User[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: UserState = {
	items: [],
	status: 'idle',
	error: null,
}

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchUsersAsync.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchUsersAsync.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.items = action.payload
			})
			.addCase(fetchUsersAsync.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message || null
			})
			.addCase(createUserAsync.fulfilled, (state, action) => {
				state.items.push(action.payload)
			})
			.addCase(editUserAsync.fulfilled, (state, action) => {
				const updatedUser = action.payload
				const index = state.items.findIndex(user => user.id === updatedUser.id)
				if (index !== -1) {
					state.items[index] = { ...updatedUser, ...state.items[index] }
				}
			})
			.addCase(deleteUserAsync.fulfilled, (state, action) => {
				state.items = state.items.filter(user => user.id !== action.payload)
			})
			.addCase(getUserByIdAsync.pending, state => {
				state.items = []
			})
			.addCase(getUserByIdAsync.fulfilled, (state, action) => {
				state.items = action.payload
			})
	},
})

export default userSlice.reducer
