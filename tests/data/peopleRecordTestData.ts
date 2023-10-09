import { DepartmentRecord, PersonRecord } from 'types'

export const personWithAvatar: PersonRecord = {
	id: '10893451',
	name: 'Roosevelt Cartwright',
	title: 'Human Infrastructure Designer',
	avatar: {
		url: 'https://www.datocms-assets.com/37761/1605803216-1.jpg',
	},
	department: {
		id: '10893315',
		name: 'Engineering',
	} as DepartmentRecord,
}

export const personWithoutAvatar: PersonRecord = {
	id: '10893459',
	name: 'John Cena',
	title: 'Wrestler / Movie Star',
	department: {
		id: '10893319',
		name: 'Entertainment',
	} as DepartmentRecord,
}
