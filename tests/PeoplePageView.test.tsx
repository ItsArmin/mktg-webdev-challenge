import { expect, test, describe } from '@jest/globals'
import { fireEvent, render } from '@testing-library/react'
import { samplePeople } from './data/peopleRecordTestData'
import { sampleDepartments } from './data/departmentRecordTestData'
import PeoplePageView from 'components/PeoplePageView'

const SEARCH_BAR = 'searchBar'
const AVATAR_FILTER = 'avatarFilter'
const DEPARTMENT_TREE = 'department-tree'
const DEPARTMENT_ITEM = 'departmentItem'
const PERSON_CARD = 'person-card'

describe('PeoplePageView', () => {
	test('it should render all people', () => {
		const { container } = render(
			<PeoplePageView
				allPeople={samplePeople}
				allDepartments={sampleDepartments}
			/>
		)

		const peopleCards = container.querySelectorAll(`.${PERSON_CARD}`)
		expect(peopleCards.length).toBe(samplePeople.length)
	})

	test('it should filter by text', () => {
		const { container } = render(
			<PeoplePageView
				allPeople={samplePeople}
				allDepartments={sampleDepartments}
			/>
		)

		const textFilter = container.querySelector(`.${SEARCH_BAR}`)
		const textFilterInput = textFilter.getElementsByTagName('input')[0]
		fireEvent.change(textFilterInput, { target: { value: 'Curly' } })

		// only one person named "Curly"
		const peopleCards = container.querySelectorAll(`.${PERSON_CARD}`)
		expect(peopleCards.length).toBe(1)
	})

	test('it should filter by avatars', () => {
		const { container } = render(
			<PeoplePageView
				allPeople={samplePeople}
				allDepartments={sampleDepartments}
			/>
		)

		const avatarFilter = container.querySelector(`.${AVATAR_FILTER}`)
		const avatarFilterButton = avatarFilter.getElementsByTagName('input')[0]
		fireEvent.click(avatarFilterButton)

		// one person doesn't have an avatar, only 3 cards should be left
		const peopleCards = container.querySelectorAll(`.${PERSON_CARD}`)
		expect(peopleCards.length).toBe(3)
	})

	test('it should filter by parent department', () => {
		const { container } = render(
			<PeoplePageView
				allPeople={samplePeople}
				allDepartments={sampleDepartments}
			/>
		)

		const departmentTree = container.querySelector(`.${DEPARTMENT_TREE}`)
		const departmentItem =
			departmentTree.getElementsByClassName(DEPARTMENT_ITEM)[0]
		const departmentItemButton =
			departmentItem.getElementsByTagName('button')[1]
		const departmentItemButtonText = departmentItemButton.children[0].innerHTML

		expect(departmentItemButtonText).toBe(sampleDepartments[0].name)

		// parent department should not filter anyone out since all people are in it
		fireEvent.click(departmentItemButton)
		const peopleCards = container.querySelectorAll(`.${PERSON_CARD}`)
		expect(peopleCards.length).toBe(4)
	})

	test('it should filter by child department', () => {
		const { container } = render(
			<PeoplePageView
				allPeople={samplePeople}
				allDepartments={sampleDepartments}
			/>
		)

		const departmentTree = container.querySelector(`.${DEPARTMENT_TREE}`)
		const departmentItem =
			departmentTree.getElementsByClassName(DEPARTMENT_ITEM)[0]
		const departmentItemFolderButton =
			departmentItem.getElementsByTagName('button')[0]

		// open folder
		fireEvent.click(departmentItemFolderButton)

		const departmentItem2 =
			departmentTree.getElementsByClassName(DEPARTMENT_ITEM)[1]
		const departmentItem2Button =
			departmentItem2.getElementsByTagName('button')[1]
		const departmentItemButton2Text =
			departmentItem2Button.children[0].innerHTML

		expect(departmentItemButton2Text).toBe(
			sampleDepartments[0].children[0].name
		)

		// filter by sub-department, only 3 people should be left
		fireEvent.click(departmentItem2Button)
		const peopleCards = container.querySelectorAll(`.${PERSON_CARD}`)
		expect(peopleCards.length).toBe(3)
	})

	test('it should show no results message when nothing found', () => {
		const { container } = render(
			<PeoplePageView
				allPeople={samplePeople}
				allDepartments={sampleDepartments}
			/>
		)

		const textFilter = container.querySelector(`.${SEARCH_BAR}`)
		const textFilterInput = textFilter.getElementsByTagName('input')[0]
		fireEvent.change(textFilterInput, { target: { value: 'Kevin James' } })

		// no one named "Kevin James"
		const peopleCards = container.querySelectorAll(`.${PERSON_CARD}`)
		expect(peopleCards.length).toBe(0)
	})
})
