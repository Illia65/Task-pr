import { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch } from '../../../../redux/store'
import {
	User,
	deleteUserAsync,
	editUserAsync,
} from '../../../../redux/user/userSlice'
import styles from './CardItem.module.css'

interface ICardItem {
	user: User
}

const CardItem: FC<ICardItem> = ({ user }) => {
	const [editing, setEditing] = useState(false)
	const [editedUser, setEditedUser] = useState({ ...user })

	const dispatch = useDispatch<AppDispatch>()

	const handleEdit = () => {
		setEditing(true)
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setEditedUser(prevUser => ({
			...prevUser,
			[name]: value,
		}))
	}

	const handleSubmit = (userId: number) => {
		dispatch(
			editUserAsync({
				userId,
				userData: editedUser,
			})
		)
		setEditing(false)
	}

	const handleDeleteUser = (userId: number) => {
		dispatch(deleteUserAsync(userId))
	}

	return (
		<li className={styles.item}>
			{editing ? (
				<>
					<input
						className={styles.input}
						type='text'
						name='firstName'
						value={editedUser.firstName}
						onChange={handleChange}
					/>
					<input
						className={styles.input}
						type='text'
						name='lastName'
						value={editedUser.lastName}
						onChange={handleChange}
					/>
					<button onClick={() => handleSubmit(user.id)}>Save</button>
					<button className={styles.ml} onClick={() => setEditing(false)}>
						Cancel
					</button>
				</>
			) : (
				<>
					<div className={styles.icon}>
						<img className={styles.img} src='./kid.png' alt='kid' />
						<div className={styles.info}>
							<div>{user.firstName}</div>
							<div>{user.lastName}</div>
						</div>
					</div>

					<div>
						<Link className={styles.link} to={`/card/${user.id}`}>
							Read more
						</Link>
					</div>

					<button onClick={handleEdit}>Edit</button>
					<button
						className={styles.ml}
						onClick={() => handleDeleteUser(user.id)}
					>
						Delete
					</button>
				</>
			)}
		</li>
	)
}

export default CardItem
