import { makeStyles } from '@mui/styles'
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridRowModel,
	GridRowParams,
	GridSortDirection,
	GridSortModel,
} from '@mui/x-data-grid'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { displayGameStatus } from '../helpers/displayGameStatus'
import { User } from '../types/models'
import { useCurrentUser } from '../hooks/contexts/useCurrentUser'
import { FaCircle } from 'react-icons/fa'
import { CircularProgress } from '@mui/material'
import { GameWithBots } from '../types/customModels'

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
	{
		field: 'status',
		headerName: 'Result',
		flex: 1,
		renderCell: ({ value }: GridRenderCellParams<string>) => {
			let color
			if (value === 'draw') color = 'gray'
			if (value === 'win') color = 'green'
			if (value === 'loss') color = 'red'
			if (!color) return <CircularProgress size={16} />
			return <FaCircle color={color} />
		},
	},
]

const gameToRow = (
	{ id, history, whiteBot, blackBot, createdAt, status }: GameWithBots,
	{ id: userId }: User,
): GridRowModel => {
	const currentUserColor = userId === whiteBot.id ? 'white' : 'black'
	return {
		id,
		createdAt,
		numOfMoves: history.length,
		whiteBotName: whiteBot.name,
		blackBotName: blackBot.name,
		status: displayGameStatus(status, currentUserColor),
	}
}

const useStyles = makeStyles(() => ({
	row: { cursor: 'pointer' },
}))

interface Props {
	games: GameWithBots[]
}

export const GamesDataGrid: FC<Props> = ({ games }) => {
	const { currentUser } = useCurrentUser()
	if (!currentUser) return null

	const classes = useStyles()
	const history = useHistory()

	const rows = games.map((game) => gameToRow(game, currentUser))
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
