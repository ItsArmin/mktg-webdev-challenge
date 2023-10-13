import { useState } from 'react'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa6'
import { DepartmentRecord } from 'types'
import s from './style.module.css'

interface Props {
	departmentRecords: DepartmentRecord[]
	selectDepartment: (department: DepartmentRecord) => void
	selectedDepartmentId?: string
	parentsofSelectedDepartment?: DepartmentRecord[]
	depth?: number
}

export default function DepartmentTree({
	departmentRecords,
	selectDepartment,
	selectedDepartmentId,
	parentsofSelectedDepartment,
	depth = 0,
}: Props): React.ReactElement {
	// state
	const [openFolders, setOpenFolders] = useState<string[]>([])

	// handlers
	const handleFolderClick = (id: string) => {
		if (openFolders.includes(id)) {
			setOpenFolders(openFolders.filter((folderId: string) => folderId !== id))
		} else {
			setOpenFolders([...openFolders, id])
		}
	}

	const handleDepartmentClick = (department: DepartmentRecord) => {
		// if already selected, unselect
		if (department.id === selectedDepartmentId) {
			selectDepartment(null)
		} else {
			selectDepartment(department)
		}
	}

	return (
		// recursively render lists of departments, styling varies based on level
		<div className={`department-tree ${s.root}`}>
			<ul className={depth > 0 ? s.subTree : s.topLayer}>
				{departmentRecords.map((record: DepartmentRecord) => {
					const isSelected =
						record.id == selectedDepartmentId ||
						parentsofSelectedDepartment?.some(
							(p: DepartmentRecord) => p.id == record.id
						)
					const isSubDepartment = record?.parent !== null

					// if there are children, render a folder and recursive tree
					if (record.children?.length > 0) {
						const isOpen = openFolders.includes(record.id)
						return (
							<li key={record.id} className={s.departmentItem}>
								<button
									aria-label={`folder for ${record.name}`}
									tabIndex={0}
									className={s.folder}
									onClick={() => handleFolderClick(record.id)}
								>
									<span className={s.folderIcon}>
										{isOpen ? <FaChevronDown /> : <FaChevronRight />}
									</span>
								</button>
								<button
									aria-label={`button for ${record.name}`}
									tabIndex={0}
									onClick={() => handleDepartmentClick(record)}
								>
									<span className={isSelected ? s.selected : ''}>
										{record.name}
									</span>
								</button>
								{isOpen && (
									<DepartmentTree
										departmentRecords={record.children}
										selectDepartment={selectDepartment}
										selectedDepartmentId={selectedDepartmentId}
										parentsofSelectedDepartment={parentsofSelectedDepartment}
										depth={depth + 1}
									/>
								)}
							</li>
						)
					} else {
						return (
							<li key={record.id} className={s.departmentItem}>
								<span className={isSubDepartment ? s.subItem : ''}></span>
								<button
									aria-label={`button for ${record.name}`}
									tabIndex={0}
									className={s.single}
									onClick={() => handleDepartmentClick(record)}
								>
									<span className={isSelected ? s.selected : s.departmentText}>
										{record.name}
									</span>
								</button>
							</li>
						)
					}
				})}
			</ul>
		</div>
	)
}
