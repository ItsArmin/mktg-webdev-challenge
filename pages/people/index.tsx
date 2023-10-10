import { useState, useCallback } from 'react'
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

interface Props {
	allPeople: PersonRecord[]
	allDepartments: DepartmentRecord[]
}

export default function PeoplePage({
	allPeople,
	allDepartments,
}: Props): React.ReactElement {
	// state variables
	const [selectedDepartment, setSelectedDepartment] =
		useState<DepartmentRecord | null>(null)
	const [childrenOfSelectedDepartment, setChildrenOfSelectedDepartment] =
		useState<DepartmentRecord[] | null>([])
	const [parentsOfSelectedDepartment, setParentsOfSelectedDepartment] =
		useState<DepartmentRecord[] | null>([])

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

	return (
		<main className="g-grid-container">
			<div className={style.peopleView}>
				<div className={style.searchBar}>
					<h1>HashiCorp Humans</h1>
					<p>Find a Hashicorp human</p>
					<input placeholder="Search..."></input>
					<div>
						<input type="checkbox" /> Hide people missing a profile image
					</div>
				</div>
				<div className={style.departmentsAndPeople}>
					<div className={style.departmentFilter}>
						<h4>Filter By Department</h4>
						<DepartmentTree
							departmentRecords={allDepartments}
							selectDepartment={handleSelectDepartment}
							selectedDepartmentId={selectedDepartment?.id}
							parentsofSelectedDepartment={parentsOfSelectedDepartment}
						/>
					</div>
					<div className={style.peopleCards}>cards</div>
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
