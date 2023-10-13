/* eslint-disable @next/next/no-img-element */
import { PersonRecord } from 'types'
import s from './style.module.css'
import { DEFAULT_AVATAR, DEFAULT_AVATAR_ALT } from '../constants'

interface Props {
	personRecord: PersonRecord
}

export default function PersonCard({
	personRecord,
}: Props): React.ReactElement {
	const avatar = personRecord.avatar?.url || DEFAULT_AVATAR

	return (
		<div aria-label={`person card`} className={`person-card ${s.root}`}>
			<img
				aria-label={`person avatar`}
				src={avatar}
				alt={personRecord.avatar?.alt ?? DEFAULT_AVATAR_ALT}
			/>
			<h3 aria-label={`person name`}>{personRecord.name}</h3>
			<p aria-label={`person title`}>{personRecord.title}</p>
			<p aria-label={`person department`} className={s.desktopOnly}>
				{personRecord.department.name}
			</p>
		</div>
	)
}
