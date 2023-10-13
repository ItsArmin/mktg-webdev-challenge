import { describe, expect, test } from '@jest/globals'
import {
	convertDepartmentsToNested,
	findParentDepartmentsOfDepartment,
	findSubDepartmentsOfDepartment,
} from '../pages/people/people.utils'
import { flatRecords, nestedRecords } from './data/departmentRecordTestData'

describe('people.utils', () => {
	test('convertDepartmentsToNested() should convert a list of departments to a nested one', () => {
		const expected = nestedRecords
		const actual = convertDepartmentsToNested(flatRecords)

		// check parent, then child for match
		expect(actual[0].id).toEqual(expected[0].id)
		expect(actual[0].children[0].id).toEqual(expected[0].children[0].id)
	})

	test('findSubDepartmentsOfDepartment() should find all sub-departments of a department', () => {
		const input = nestedRecords[0]
		const expected = nestedRecords[0].children[0]
		const actual = findSubDepartmentsOfDepartment(input)

		expect(actual[0].id).toEqual(expected.id)
	})

	test('findParentDepartmentsOfDepartment() should find all parents of a department', () => {
		const allDepartments = nestedRecords
		const input = nestedRecords[0].children[0]
		const expected = nestedRecords[0]
		const actual = findParentDepartmentsOfDepartment(input, allDepartments)

		expect(actual[0].id).toEqual(expected.id)
	})
})
