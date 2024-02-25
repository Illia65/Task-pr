import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchDevices } from '../../../redux/device/deviceSlice'
import { fetchProjects } from '../../../redux/project/projectSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import {
	fetchUsersAsync,
	getUserByIdAsync,
} from '../../../redux/user/userSlice'

const CardDetail: FC = () => {
	const { id } = useParams()
	const dispatch = useDispatch<AppDispatch>()

	const users = useSelector((state: RootState) => state.users.items)
	const devices = useSelector((state: RootState) => state.devices.items)
	const projects = useSelector((state: RootState) => state.projects.items)

	useEffect(() => {
		dispatch(fetchUsersAsync())
		dispatch(fetchDevices())
		dispatch(fetchProjects())
	}, [dispatch])

	useEffect(() => {
		if (id) {
			dispatch(getUserByIdAsync(id))
		}
		return
	}, [id, dispatch])

	const formatDate = (dateString: string | undefined | null) => {
		if (!dateString) return ''

		const date = new Date(dateString)
		const day = date.getDate()
		const month = date.getMonth() + 1
		const year = date.getFullYear()

		return `${day < 10 ? '0' + day : day}.${
			month < 10 ? '0' + month : month
		}.${year}`
	}

	if (!users.length) return <div>Not Found users!</div>

	const user = users[0]

	return (
		<div key={user.id} className='user-card'>
			<h2>User name</h2>
			<div>
				<p>
					{user.firstName} {user.lastName}
				</p>
			</div>
			<h2>Devices:</h2>
			{devices
				.filter(device => device.projectId === user.projectId)
				.map(device => (
					<p key={device.id}>{device.serialNumber}</p>
				))}
			<h2>Project Name:</h2>
			<p>
				{projects.find(project => Number(project.id) === user.projectId)?.title}
			</p>
			<h2>Date Range:</h2>
			<p>
				Begin Date:
				{formatDate(
					projects.find(project => Number(project.id) === user.projectId)
						?.beginDate
				)}
			</p>
			<p>
				Expiration Date:
				{formatDate(
					projects.find(project => Number(project.id) === user.projectId)
						?.expirationDate
				) || <> No expiration date has been set 💀</>}
			</p>
		</div>
	)
}

export default CardDetail
