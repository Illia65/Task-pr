import axios from 'axios'
import { IEditUserAsync } from '../redux/user/userSlice'

export const API_URL = 'http://localhost:4200'

export const fetchUsers = async () => {
	const response = await axios.get(`${API_URL}/users`)
	return response.data
}

export const createUser = async (userData: any) => {
	const response = await axios.post(`${API_URL}/users`, userData)
	return response.data
}

export const editUser = async (userId: number, userData: IEditUserAsync) => {
	const response = await axios.put(`${API_URL}/users/${userId}`, userData)
	return response.data
}

export const deleteUser = async (userId: number) => {
	await axios.delete(`${API_URL}/users/${userId}`)
}

export const getUserById = async (userId: string) => {
	const response = await axios.get(`${API_URL}/users?id=${userId}`)

	return response.data
}
