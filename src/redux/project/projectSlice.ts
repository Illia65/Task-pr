import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface Project {
	id: number
	title: string
	parentId: number | null
	beginDate: string
	expirationDate: string | null
	deleted: number
}

interface ProjectState {
	items: Project[]
	loading: boolean
	error: string | null
}

const initialState: ProjectState = {
	items: [],
	loading: false,
	error: null,
}

export const fetchProjects = createAsyncThunk(
	'projects/fetchProjects',
	async () => {
		const response = await axios.get('http://localhost:4200/projects')
		return response.data
	}
)

const projectSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchProjects.pending, state => {
				state.loading = true
			})
			.addCase(fetchProjects.fulfilled, (state, action) => {
				state.loading = false
				state.items = action.payload
				state.error = null
			})
			.addCase(fetchProjects.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message ?? 'An error occurred'
			})
	},
})

export default projectSlice.reducer
