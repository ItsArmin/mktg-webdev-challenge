import rivetQuery from '@hashicorp/platform-cms'
import { GetStaticPropsResult } from 'next'
import { PersonRecord, DepartmentRecord } from 'types'
import BaseLayout from '../../layouts/base'
import query from './query.graphql'
import { convertDepartmentsToNested } from './people.utils'
import PeoplePageView from 'components/PeoplePageView'

interface Props {
	allPeople: PersonRecord[]
	allDepartments: DepartmentRecord[]
}

export default function PeoplePage({
	allPeople,
	allDepartments,
}: Props): React.ReactElement {
	return (
		<main className="g-grid-container">
			<PeoplePageView allPeople={allPeople} allDepartments={allDepartments} />
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
