import { makeStyles } from '@mui/styles'
import {
	DataGrid,
	GridColDef,
	GridRowModel,
	GridRowParams,
} from '@mui/x-data-grid'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Bot, Game } from '@models'
import { GameWithBots } from '@modelsWith'

const columns: GridColDef[] = [
	{ field: 'numOfMoves', headerName: '# moves', flex: 1 },
	{ field: 'whiteBotName', headerName: 'White bot', flex: 1 },
	{ field: 'blackBotName', headerName: 'Black bot', flex: 1 },
]

const gameToRow = ({
	id,
	history,
	whiteBot,
	blackBot,
}: GameWithBots): GridRowModel => ({
	id,
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

	// TODO: Replace null
	if (!games.length) return null

	const rows = games.map(gameToRow)
	const onRowClick = ({ id }: GridRowParams) => history.push(`/games/${id}`)
	const getRowClassName = () => classes.row

	return (
		<DataGrid
			disableSelectionOnClick
			autoHeight
			autoPageSize
			columns={columns}
			rows={rows}
			onRowClick={onRowClick}
			getRowClassName={getRowClassName}
		/>
	)
}
