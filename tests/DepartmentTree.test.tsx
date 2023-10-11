import { expect, test, describe, jest } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import DepartmentTree from 'components/DepartmentTree'
import { nestedRecords } from './data/departmentRecordTestData'

describe('DepartmentTree', () => {
	test('it should render a nested list of departments', () => {
		const selectDepartmentMock = jest.fn()
		render(
			<DepartmentTree
				departmentRecords={nestedRecords}
				selectDepartment={selectDepartmentMock}
			/>
		)

		// initial list, just 1st level since not open yet
		const lists = screen.getAllByRole('list')
		expect(lists.length).toBe(1)

		// open up the first folder, now check for 2 lists
		const folderButton = screen.getAllByRole('button')[0]
		fireEvent.click(folderButton)

		const listsAfterClick = screen.getAllByRole('list')
		expect(listsAfterClick.length).toBe(2)
	})
})
