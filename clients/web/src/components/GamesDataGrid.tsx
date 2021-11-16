import { makeStyles } from '@mui/styles'
import {
	DataGrid,
	GridColDef,
	GridRowModel,
	GridRowParams,
} from '@mui/x-data-grid'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Game } from '../types/models'

const columns: GridColDef[] = [
	{ field: 'history', headerName: 'Moves', flex: 1 },
	{ field: 'passiveBotId', headerName: 'Opponent id', flex: 1 },
]

const gameToRow = ({ id, history, passiveBotId }: Game): GridRowModel => ({
	id,
	history,
	passiveBotId,
})

const useStyles = makeStyles(() => ({ row: { cursor: 'pointer' } }))

interface Props {
	games: Game[]
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
