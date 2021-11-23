import { makeStyles } from '@mui/styles'
import {
	DataGrid,
	GridColDef,
	GridRowModel,
	GridRowParams,
	GridSortDirection,
	GridFooterContainer,
	GridRenderCellParams,
	GridSortModel,
} from '@mui/x-data-grid'
import moment from 'moment'
import { FC } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Bot } from '@models'
import { Box, Button } from '@mui/material'
import { FaCircle } from 'react-icons/fa'

const SORTING_ORDER: GridSortDirection[] = ['asc', 'desc']
const SORT_MODEL: GridSortModel = [{ field: 'createdAt', sort: 'desc' }]

const useStyles = makeStyles(() => ({ row: { cursor: 'pointer' } }))

const columns: GridColDef[] = [
	{ field: 'name', headerName: 'Name', flex: 1 },
	{ field: 'elo', headerName: 'Elo', flex: 1 },
	{ field: 'endpoint', headerName: 'Endpoint', flex: 1 },
	{
		field: 'createdAt',
		headerName: 'Created at',
		flex: 1,
		valueFormatter: ({ value }) => moment(value as string).calendar(),
	},
	{
		field: 'status',
		headerName: 'Health',
		flex: 1,
		renderCell: ({ value }: GridRenderCellParams<string>) => {
			const color = value === 'healthy' ? 'green' : 'red'
			return <FaCircle color={color} />
		},
	},
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
	createdAt,
	elo,
	status,
})

const BOT_LIMIT = 3

interface Props {
	bots: Bot[]
}

export const BotsDataGrid: FC<Props> = ({ bots }) => {
	const history = useHistory()
	const classes = useStyles()

	const onRowClick = ({ id }: GridRowParams) => history.push(`/bots/${id}`)
	const getRowClassName = () => classes.row

	const rows = bots.map(botToRow)

	const footer = (
		<GridFooterContainer>
			<Box sx={{ pl: 1 }}>
				{bots.length < BOT_LIMIT && (
					<Button variant="text" to="/bots/new" component={Link}>
						Create new bot
					</Button>
				)}
			</Box>
		</GridFooterContainer>
	)

	return (
		<DataGrid
			disableSelectionOnClick
			autoHeight
			autoPageSize
			columns={columns}
			rows={rows}
			onRowClick={onRowClick}
			getRowClassName={getRowClassName}
			components={{
				Footer: () => footer,
			}}
			sortingOrder={SORTING_ORDER}
			sortModel={SORT_MODEL}
		/>
	)
}
