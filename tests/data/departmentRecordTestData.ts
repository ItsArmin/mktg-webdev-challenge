import { DepartmentRecord } from 'types'

export const flatRecords = [
	{
		id: '123',
		name: '123',
	},
	{
		id: '456',
		name: '456',
		parent: {
			id: '123',
		} as DepartmentRecord,
	},
] as DepartmentRecord[]

export const nestedRecords = [
	{
		id: '123',
		name: '123',
		children: [
			{
				id: '456',
				name: '456',
				parent: { id: '123' } as DepartmentRecord,
			} as DepartmentRecord,
		],
	},
] as DepartmentRecord[]
