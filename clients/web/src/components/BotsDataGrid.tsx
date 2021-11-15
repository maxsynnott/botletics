import { makeStyles } from '@mui/styles'
import {
	DataGrid,
	GridColDef,
	GridRowParams,
	GridSortDirection,
} from '@mui/x-data-grid'
import moment from 'moment'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Bot } from '../types/models'

const useStyles = makeStyles(() => ({ row: { cursor: 'pointer' } }))

const columns: GridColDef[] = [
	{ field: 'name', headerName: 'Name', flex: 1 },
	{ field: 'endpoint', headerName: 'Endpoint', flex: 1 },
	{
		field: 'createdAt',
		headerName: 'Created at',
		flex: 1,
		valueFormatter: ({ value }) => moment(value as string).calendar(),
	},
]

interface Props {
	bots: Bot[]
}

export const BotsDataGrid: FC<Props> = ({ bots }) => {
	const history = useHistory()
	const classes = useStyles()

	const onRowClick = ({ id }: GridRowParams) => history.push(`/bots/${id}`)
	const getRowClassName = () => classes.row
	const sortingOrder: GridSortDirection[] = ['asc', 'desc']

	return (
		<DataGrid
			disableSelectionOnClick
			autoHeight
			autoPageSize
			columns={columns}
			rows={bots}
			onRowClick={onRowClick}
			getRowClassName={getRowClassName}
			sortingOrder={sortingOrder}
		/>
	)
}
