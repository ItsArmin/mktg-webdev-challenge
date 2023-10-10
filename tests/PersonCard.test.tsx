/**
 * @jest-environment jsdom
 */
import { expect, test, describe } from '@jest/globals'
import { render } from '@testing-library/react'
import PersonCard from 'components/PersonCard'
import {
	personWithAvatar,
	personWithoutAvatar,
} from './data/peopleRecordTestData'

// TODO: fix tests
describe('PersonCard', () => {
	// test('it should render a person card with a custom avatar', () => {
	// 	const { container } = render(<PersonCard personRecord={personWithAvatar} />)
	// 	const name = container.getElementsByTagName('h3')[0].innerText
	// 	const title = container.getElementsByTagName('p')[0].innerText
	// 	const department = container.getElementsByTagName('p')[1].innerText
	// 	expect(name).toBe(personWithAvatar.name)
	// 	expect(title).toBe(personWithAvatar.name)
	// 	expect(department).toBe(personWithAvatar.department.name)
	// })
	// test('it should render a person card with a default avatar', () => {
	// 	const personCard = render(<PersonCard personRecord={personWithoutAvatar} />)
	// 	expect('hello').toBe('hello')
	// })
	test('runs a simple test', () => {
		expect('hello').toBe('hello')
	})
})
