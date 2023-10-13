import { DepartmentRecord, PersonRecord } from 'types'

export const personWithAvatar: PersonRecord = {
	id: '1985',
	name: 'Mario',
	title: 'Plumber',
	avatar: {
		url: 'mario.jpg',
	},
	department: {
		id: '641996',
		name: 'Plumbing',
	} as DepartmentRecord,
}

export const personWithoutAvatar: PersonRecord = {
	id: '2002',
	name: 'John Cena',
	title: 'Wrestler / Movie Star',
	department: {
		id: '2005',
		name: 'Entertainment',
	} as DepartmentRecord,
}

export const person1: PersonRecord = {
	id: '123',
	name: 'Moe',
	title: 'Comedian',
	avatar: {
		url: 'random.jpg',
	},
	department: {
		id: '10893322',
		name: 'Workplace',
	} as DepartmentRecord,
}

export const person2: PersonRecord = {
	id: '456',
	name: 'Larry',
	title: 'Violinist',
	avatar: {
		url: 'random.jpg',
	},
	department: {
		id: '10893329',
		name: 'Facilities',
	} as DepartmentRecord,
}

export const person3: PersonRecord = {
	id: '789',
	name: 'Curly',
	title: 'Wise Guy',
	avatar: {
		url: 'random.jpg',
	},
	department: {
		id: '10893327',
		name: 'Sanitation',
	} as DepartmentRecord,
}

export const person4: PersonRecord = {
	id: '1011',
	name: 'Shemp',
	title: 'Comedian',
	department: {
		id: '10893329',
		name: 'Facilities',
	} as DepartmentRecord,
}

export const samplePeople = [
	person1,
	person2,
	person3,
	person4,
] as PersonRecord[]
