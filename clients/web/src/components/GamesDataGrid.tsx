import { makeStyles } from '@mui/styles'
import {
	DataGrid,
	GridColDef,
	GridRowModel,
	GridRowParams,
	GridSortDirection,
	GridSortModel,
} from '@mui/x-data-grid'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { GameWithBots } from '@modelsWith'
import moment from 'moment'

const SORTING_ORDER: GridSortDirection[] = ['asc', 'desc']
const SORT_MODEL: GridSortModel = [{ field: 'createdAt', sort: 'desc' }]

const columns: GridColDef[] = [
	{ field: 'numOfMoves', headerName: '# moves', flex: 1 },
	{ field: 'whiteBotName', headerName: 'White bot', flex: 1 },
	{ field: 'blackBotName', headerName: 'Black bot', flex: 1 },
	{
		field: 'createdAt',
		headerName: 'Created at',
		flex: 1,
		valueFormatter: ({ value }) => moment(value as string).calendar(),
	},
]

const gameToRow = ({
	id,
	history,
	whiteBot,
	blackBot,
	createdAt,
}: GameWithBots): GridRowModel => ({
	id,
	createdAt,
	numOfMoves: history.length,
	whiteBotName: whiteBot.name,
	blackBotName: blackBot.name,
})

const useStyles = makeStyles(() => ({ row: { cursor: 'pointer' } }))

interface Props {
	games: GameWithBots[]
}

export const GamesDataGrid: FC<Props> = ({ games }) => {
	const classes = useStyles()
	const history = useHistory()

	const rows = games.map(gameToRow)
	const onRowClick = ({ id }: GridRowParams) => history.push(`/games/${id}`)
	const getRowClassName = () => classes.row

	return (
		<DataGrid
			disableSelectionOnClick
			autoPageSize
			columns={columns}
			rows={rows}
			onRowClick={onRowClick}
			getRowClassName={getRowClassName}
			sortingOrder={SORTING_ORDER}
			sortModel={SORT_MODEL}
		/>
	)
}
