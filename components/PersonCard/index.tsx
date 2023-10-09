/* eslint-disable @next/next/no-img-element */
import { PersonRecord } from 'types'
import s from './style.module.css'

interface Props {
	personRecord: PersonRecord
}

// TODO: improve styling
const PersonCard = ({ personRecord }: Props) => {
	const defaultAvatar = `../../static/images/noAvatar.png`
	const avatar = personRecord.avatar?.url || defaultAvatar

	return (
		<div className={`person-card ${s.root}`}>
			<img src={avatar} alt={personRecord.avatar?.alt ?? 'default avatar'} />
			<h3>{personRecord.name}</h3>
			<p>{personRecord.title}</p>
			<p>{personRecord.department.name}</p>
		</div>
	)
}

export default PersonCard
