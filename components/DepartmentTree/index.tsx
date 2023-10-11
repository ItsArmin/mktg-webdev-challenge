import { useState } from 'react'
import { DepartmentRecord } from 'types'
import s from './style.module.css'

interface Props {
	departmentRecords: DepartmentRecord[]
	selectDepartment: (department: DepartmentRecord) => void
	selectedDepartmentId?: string
	parentsofSelectedDepartment?: DepartmentRecord[]
}

const DepartmentTree = ({
	departmentRecords,
	selectDepartment,
	selectedDepartmentId,
	parentsofSelectedDepartment,
}: Props) => {
	// TODO: use icons?
	const folderSymbols = ['>', 'v']

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

	const handleClick = (department: DepartmentRecord, isFolder: boolean) => {
		// if already selected, unselect
		if (department.id === selectedDepartmentId) {
			selectDepartment(null)
		} else {
			selectDepartment(department)
		}
	}

	return (
		<div className={`department-tree ${s.root}`}>
			<ul>
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
									className={s.folder}
									onClick={() => handleFolderClick(record.id)}
								>
									{isOpen ? folderSymbols[1] : folderSymbols[0]}
								</button>
								<button onClick={() => handleClick(record, true)}>
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
									/>
								)}
							</li>
						)
					} else {
						return (
							<li key={record.id}>
								{/* add line if child department.. TODO: replace w/ styling */}
								<span className={isSubDepartment ? s.subItem : ''}></span>
								<button
									className={s.single}
									onClick={() => handleClick(record, false)}
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
