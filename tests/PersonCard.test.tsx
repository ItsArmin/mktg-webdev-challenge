import { expect, test, describe } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import PersonCard from 'components/PersonCard'
import {
	personWithAvatar,
	personWithoutAvatar,
} from './data/peopleRecordTestData'

describe('PersonCard', () => {
	test('it should render a person card with a custom avatar', () => {
		render(<PersonCard personRecord={personWithAvatar} />)

		const avatar = screen.getByRole('img') as HTMLImageElement
		const name = screen.getByText(personWithAvatar.name)
		const title = screen.getByText(personWithAvatar.title)
		const department = screen.getByText(personWithAvatar.department.name)

		expect(avatar.src).toBe(personWithAvatar.avatar.url)
		expect(name.innerHTML).toBe(personWithAvatar.name)
		expect(title.innerHTML).toBe(personWithAvatar.title)
		expect(department.innerHTML).toBe(personWithAvatar.department.name)
	})

	test('it should render a person card without a custom avatar', () => {
		const defaultAvatarPath = `static/images/noAvatar.png`

		render(<PersonCard personRecord={personWithoutAvatar} />)

		const avatar = screen.getByRole('img') as HTMLImageElement
		const name = screen.getByText(personWithoutAvatar.name)
		const title = screen.getByText(personWithoutAvatar.title)
		const department = screen.getByText(personWithoutAvatar.department.name)

		expect(avatar.src).toContain(defaultAvatarPath)
		expect(name.innerHTML).toBe(personWithoutAvatar.name)
		expect(title.innerHTML).toBe(personWithoutAvatar.title)
		expect(department.innerHTML).toBe(personWithoutAvatar.department.name)
	})
})
