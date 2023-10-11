import { useState, useCallback, useEffect, ChangeEvent } from 'react'
import rivetQuery from '@hashicorp/platform-cms'
import { GetStaticPropsResult } from 'next'
import { PersonRecord, DepartmentRecord } from 'types'
import BaseLayout from '../../layouts/base'
import style from './style.module.css'
import query from './query.graphql'
import DepartmentTree from 'components/DepartmentTree'
import {
	convertDepartmentsToNested,
	findParentDepartmentsOfDepartment,
	findSubDepartmentsOfDepartment,
} from './people.utils'
import PersonCard from 'components/PersonCard'

interface Props {
	allPeople: PersonRecord[]
	allDepartments: DepartmentRecord[]
}

export default function PeoplePage({
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
		<main className="g-grid-container">
			<div className={style.peopleView}>
				<div className={style.searchArea}>
					<h1>HashiCorp Humans</h1>
					<p>Find a Hashicorp human</p>
					{/* TODO: add icon in input? */}
					<div className={style.searchBar}>
						<input
							placeholder="Search people by name"
							value={searchText}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								handleTyping(e.target.value)
							}
						></input>
					</div>
					<div>
						<input type="checkbox" onClick={() => handleToggleAvatars()} /> Hide
						people missing a profile image
					</div>
				</div>
				<div className={style.departmentsAndPeople}>
					<div className={`${style.departmentFilter} ${style.desktopOnly}`}>
						<h4>Filter By Department</h4>
						<DepartmentTree
							departmentRecords={allDepartments}
							selectDepartment={handleSelectDepartment}
							selectedDepartmentId={selectedDepartment?.id}
							parentsofSelectedDepartment={parentsOfSelectedDepartment}
						/>
					</div>
					<div className={style.peopleCards}>
						{filteredPeople.map((p: PersonRecord, i: number) => {
							return <PersonCard key={p.id} personRecord={p} />
						})}
						{filteredPeople.length === 0 && `No results found.`}
					</div>
				</div>
			</div>
			{/* Original elements: */}
			{/* <h2>People Data</h2>
			<pre className={style.myData}>{JSON.stringify(allPeople, null, 2)}</pre> 
			<h2>Departments Data</h2>
			<pre className={style.myData}>
				{JSON.stringify(allDepartments, null, 2)}
			</pre>*/}
		</main>
	)
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
	const data = await rivetQuery({ query })
	data.allDepartments = processDepartmentRecordData(
		data.allDepartments as DepartmentRecord[]
	)
	return { props: data }
}

const processDepartmentRecordData = (
	data: DepartmentRecord[]
): DepartmentRecord[] => {
	const res = convertDepartmentsToNested(data)
	return res
}

PeoplePage.layout = BaseLayout
