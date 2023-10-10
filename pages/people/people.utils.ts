import { DepartmentRecord } from 'types'

// find all ancestors of a department
export const findParentDepartmentsOfDepartment = (
	department: DepartmentRecord,
	allDepartments: DepartmentRecord[]
): DepartmentRecord[] => {
	if (!department) {
		return []
	}

	const parentDepartments: DepartmentRecord[] = []

	// DFS to find all ancestors of a department
	const findParentDepartmentsHelper = (
		cur: DepartmentRecord,
		path: DepartmentRecord[]
	) => {
		if (cur.id === department.id) {
			parentDepartments.push(...path)
			return
		}

		if (cur?.children) {
			for (const c of cur.children) {
				findParentDepartmentsHelper(c, [...path, cur])
			}
		}

		return
	}

	allDepartments.forEach((d: DepartmentRecord) =>
		findParentDepartmentsHelper(d, [])
	)

	return parentDepartments
}

// find all descendants of a department
export const findSubDepartmentsOfDepartment = (
	department: DepartmentRecord
): DepartmentRecord[] => {
	if (!department) {
		return []
	}

	const subDepartments: DepartmentRecord[] = []

	const findSubDepartmentsHelper = (cur: DepartmentRecord) => {
		if (cur.children) {
			subDepartments.push(...cur.children)

			for (const c of cur.children) {
				findSubDepartmentsHelper(c)
			}
		}
	}

	findSubDepartmentsHelper(department)
	return subDepartments
}

// converts a flat array of departments to a nested array of departments
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
