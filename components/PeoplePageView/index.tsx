import { useState, useCallback, useEffect, ChangeEvent } from 'react'
import { PersonRecord, DepartmentRecord } from 'types'
import s from './style.module.css'
import DepartmentTree from 'components/DepartmentTree'
import {
	findParentDepartmentsOfDepartment,
	findSubDepartmentsOfDepartment,
} from 'pages/people/people.utils'
import PersonCard from 'components/PersonCard'
import { FaCheck, FaMagnifyingGlass } from 'react-icons/fa6'
import {
	AVATAR_FILTER_LABEL,
	DEPARTMENT_FILTER_TITLE,
	NO_RESULTS,
	PEOPLE_PAGE_SUBTITLE,
	PEOPLE_PAGE_TITLE,
	SEARCH_PEOPLE_PLACEHOLDER,
} from '../constants'

interface Props {
	allPeople: PersonRecord[]
	allDepartments: DepartmentRecord[]
}

export default function PeoplePageView({
	allPeople,
	allDepartments,
}: Props): React.ReactElement {
	// state variables
	const [filteredPeople, setFilteredPeople] =
		useState<PersonRecord[]>(allPeople)
	const [selectedDepartment, setSelectedDepartment] =
		useState<DepartmentRecord | null>(null)
	const [childrenOfSelectedDepartment, setChildrenOfSelectedDepartment] =
		useState<DepartmentRecord[] | null>([])
	const [parentsOfSelectedDepartment, setParentsOfSelectedDepartment] =
		useState<DepartmentRecord[] | null>([])
	const [hidePeopleWithoutAvatar, setHidePeopleWithoutAvatar] =
		useState<boolean>(false)
	const [searchText, setSearchText] = useState<string>('')

	// handlers
	const handleSelectDepartment = useCallback(
		(d: DepartmentRecord) => {
			setSelectedDepartment(d)
			setChildrenOfSelectedDepartment(findSubDepartmentsOfDepartment(d))
			setParentsOfSelectedDepartment(
				findParentDepartmentsOfDepartment(d, allDepartments)
			)
		},
		[
			setSelectedDepartment,
			setChildrenOfSelectedDepartment,
			setParentsOfSelectedDepartment,
			allDepartments,
		]
	)

	const handleToggleAvatars = useCallback(() => {
		setHidePeopleWithoutAvatar(!hidePeopleWithoutAvatar)
	}, [hidePeopleWithoutAvatar])

	const handleTyping = useCallback((val: string) => {
		setSearchText(val)
	}, [])

	// functionality
	const applyFilters = useCallback(() => {
		let newFiltered = [...allPeople]
		if (hidePeopleWithoutAvatar) {
			newFiltered = newFiltered.filter((p: PersonRecord) => p.avatar?.url)
		}
		// filter by selected department and any possible sub departments
		if (selectedDepartment) {
			const names = [selectedDepartment.name]
			if (childrenOfSelectedDepartment.length > 0) {
				names.push(
					...childrenOfSelectedDepartment.map((d: DepartmentRecord) => d.name)
				)
			}
			newFiltered = newFiltered.filter((p: PersonRecord) =>
				names.includes(p.department.name)
			)
		}
		if (searchText.length > 0) {
			newFiltered = newFiltered.filter((p: PersonRecord) =>
				p.name.toLowerCase().includes(searchText.toLowerCase())
			)
		}
		setFilteredPeople(newFiltered)
	}, [
		allPeople,
		hidePeopleWithoutAvatar,
		selectedDepartment,
		searchText,
		childrenOfSelectedDepartment,
	])

	useEffect(() => {
		applyFilters()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hidePeopleWithoutAvatar, selectedDepartment, searchText])

	return (
		<div className={`people-page-view ${s.root}`}>
			<div className={s.peopleView}>
				<div className={s.searchArea}>
					<h1>{PEOPLE_PAGE_TITLE}</h1>
					<p>{PEOPLE_PAGE_SUBTITLE}</p>
					<div className={s.searchBar}>
						<FaMagnifyingGlass className={s.searchIcon} />
						<input
							aria-label={`text filter`}
							placeholder={SEARCH_PEOPLE_PLACEHOLDER}
							value={searchText}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								handleTyping(e.target.value)
							}
						/>
					</div>
					{/* custom checkbox */}
					<div className={s.avatarFilter}>
						<button
							className={
								hidePeopleWithoutAvatar
									? s.avatarCheckboxChecked
									: s.avatarCheckbox
							}
							aria-label="avatar checkbox"
							onClick={() => handleToggleAvatars()}
						>
							<span>
								<FaCheck />
							</span>
						</button>
						<span>{AVATAR_FILTER_LABEL}</span>
					</div>
				</div>
				<div className={s.departmentsAndPeople}>
					<div
						aria-label={`department filter`}
						className={`${s.departmentFilter} ${s.desktopOnly}`}
					>
						<h4>{DEPARTMENT_FILTER_TITLE}</h4>
						<DepartmentTree
							departmentRecords={allDepartments}
							selectDepartment={handleSelectDepartment}
							selectedDepartmentId={selectedDepartment?.id}
							parentsofSelectedDepartment={parentsOfSelectedDepartment}
						/>
					</div>
					<div
						aria-label={`people cards section`}
						className={`${s.peopleCards} ${s.mobileCards}`}
					>
						{filteredPeople.map((p: PersonRecord, i: number) => {
							return <PersonCard key={p.id} personRecord={p} />
						})}
						{filteredPeople.length === 0 && (
							<div className={s.noResults}>{NO_RESULTS}</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
