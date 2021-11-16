import { Box } from '@mui/system'
import { Piece, Square } from 'chess.js'
import { FC } from 'react'
import { getChessPieceImageUrl } from '../helpers/getChessPieceImageUrl'
import { getSquarePosition } from '../helpers/getSquarePosition'

interface Props {
	piece: Piece
	square: Square
}

export const ChessPiece: FC<Props> = ({ piece, square }) => {
	const [left, top] = getSquarePosition(square)

	return (
		<Box
			sx={{
				height: '12.5%',
				width: '12.5%',
				backgroundSize: '100%',
				position: 'absolute',
				backgroundImage: `url(${getChessPieceImageUrl(piece)})`,
				left,
				top,
			}}
		/>
	)
}
