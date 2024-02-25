import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDevices } from '../../../redux/device/deviceSlice'
import { fetchProjects } from '../../../redux/project/projectSlice'
import { AppDispatch, RootState } from '../../../redux/store'
import { fetchUsersAsync } from '../../../redux/user/userSlice'
import styles from './Cards.module.css'
import CardItem from './card-item/CardItem'

const UserCard: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()

	const {
		items: users,
		status,
		error,
	} = useSelector((state: RootState) => state.users)

	useEffect(() => {
		dispatch(fetchUsersAsync())
		dispatch(fetchDevices())
		dispatch(fetchProjects())
	}, [dispatch])

	if (status === 'loading') return <div>Loading...</div>
	if (status === 'failed') return <div>Error: {error}</div>

	return (
		<div>
			<ul className={styles.users}>
				{users.map(user => (
					<CardItem key={user.id} user={user} />
				))}
			</ul>
		</div>
	)
}

export default UserCard
