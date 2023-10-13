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

export const sampleDepartments = [
	{
		id: '10893322',
		name: 'Workplace',
		parent: null,
		children: [
			{
				id: '10893329',
				name: 'Facilities',
				parent: { id: '10893322' },
				children: [
					{
						id: '10893327',
						name: 'Sanitation',
						parent: { id: '10893329' },
					} as DepartmentRecord,
				],
			} as DepartmentRecord,
		],
	},
] as DepartmentRecord[]
