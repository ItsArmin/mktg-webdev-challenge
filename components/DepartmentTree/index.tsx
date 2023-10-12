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

const DepartmentTree = ({
	departmentRecords,
	selectDepartment,
	selectedDepartmentId,
	parentsofSelectedDepartment,
	depth = 0,
}: Props) => {
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

	const handleClick = (department: DepartmentRecord) => {
		// if already selected, unselect
		if (department.id === selectedDepartmentId) {
			selectDepartment(null)
		} else {
			selectDepartment(department)
		}
	}

	return (
		<div className={`department-tree ${s.root}`} tabIndex={depth}>
			<ul className={depth > 0 ? s.subTree : ''} tabIndex={depth}>
				{departmentRecords.map((record: DepartmentRecord) => {
					const isSelected =
						record.id == selectedDepartmentId ||
						parentsofSelectedDepartment?.some(
							(p: DepartmentRecord) => p.id == record.id
						)
					const isSubDepartment = record?.parent !== null
					if (record.children?.length > 0) {
						const isOpen = openFolders.includes(record.id)
						return (
							<li key={record.id}>
								<button
									tabIndex={depth}
									className={s.folder}
									onClick={() => handleFolderClick(record.id)}
								>
									<span className={s.folderIcon}>
										{isOpen ? <FaChevronDown /> : <FaChevronRight />}
									</span>
								</button>
								<button tabIndex={0} onClick={() => handleClick(record)}>
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
							<li key={record.id}>
								<span className={isSubDepartment ? s.subItem : ''}></span>
								<button
									tabIndex={depth}
									className={s.single}
									onClick={() => handleClick(record)}
								>
									<span className={isSelected ? s.selected : ''}>
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

export default DepartmentTree
