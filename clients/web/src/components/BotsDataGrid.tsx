import { makeStyles } from '@mui/styles'
import {
	DataGrid,
	GridColDef,
	GridRowModel,
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
	{ field: 'elo', headerName: 'Elo', flex: 1 },
	{ field: 'endpoint', headerName: 'Endpoint', flex: 1 },
	{ field: 'createdAt', headerName: 'Created at', flex: 1 },
	{ field: 'health', headerName: 'Health', flex: 1 },
]

const botToRow = ({
	id,
	name,
	endpoint,
	createdAt,
	elo,
	status,
}: Bot): GridRowModel => ({
	id,
	name,
	endpoint,
	createdAt: moment(createdAt).calendar(),
	elo,
	health: status === 'healthy' ? 'Healthy' : 'Unhealthy',
})

interface Props {
	bots: Bot[]
}

export const BotsDataGrid: FC<Props> = ({ bots }) => {
	const history = useHistory()
	const classes = useStyles()

	// TODO: Replace null
	if (!bots.length) return null

	const onRowClick = ({ id }: GridRowParams) => history.push(`/bots/${id}`)
	const getRowClassName = () => classes.row
	const sortingOrder: GridSortDirection[] = ['asc', 'desc']

	const rows = bots.map(botToRow)

	return (
		<DataGrid
			disableSelectionOnClick
			autoHeight
			autoPageSize
			columns={columns}
			rows={rows}
			onRowClick={onRowClick}
			getRowClassName={getRowClassName}
			sortingOrder={sortingOrder}
		/>
	)
}
