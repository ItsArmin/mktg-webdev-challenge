import { DepartmentRecord } from 'types'

export const convertDepartmentsToNested = (
	departments: DepartmentRecord[]
): DepartmentRecord[] => {
	// for all entries, find parent-child connections and link them together
	for (let i = 0; i < departments.length; i++) {
		const first = departments[i]

		for (let j = i + 1; j < departments.length; j++) {
			const second = departments[j]

			// if first and second are linked, add child to parent's children
			if (first.id === second.parent?.id) {
				addChildrenToDepartment(first, second)
			} else if (second.id === first.parent?.id) {
				addChildrenToDepartment(second, first)
			}
		}
	}

	// remove extra records (i.e. child connections to non-top level departments)
	return departments.filter((r: DepartmentRecord) => !r.parent)
}

const addChildrenToDepartment = (
	parent: DepartmentRecord,
	child: DepartmentRecord
) => {
	if (parent.children) {
		parent.children.push(child)
	} else {
		parent.children = [child]
	}
}
