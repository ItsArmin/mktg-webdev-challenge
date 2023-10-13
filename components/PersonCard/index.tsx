/* eslint-disable @next/next/no-img-element */
import { PersonRecord } from 'types'
import s from './style.module.css'

interface Props {
	personRecord: PersonRecord
}

export default function PersonCard({
	personRecord,
}: Props): React.ReactElement {
	const defaultAvatar = `../../static/images/noAvatar.png`
	const avatar = personRecord.avatar?.url || defaultAvatar

	return (
		<div className={`person-card ${s.root}`}>
			<img src={avatar} alt={personRecord.avatar?.alt ?? 'default avatar'} />
			<h3>{personRecord.name}</h3>
			<p>{personRecord.title}</p>
			<p className={s.desktopOnly}>{personRecord.department.name}</p>
		</div>
	)
}
