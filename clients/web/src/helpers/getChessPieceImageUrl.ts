import { Piece, PieceType } from 'chess.js'
import bb from '../../assets/bb.png'
import bk from '../../assets/bk.png'
import bn from '../../assets/bn.png'
import bp from '../../assets/bp.png'
import bq from '../../assets/bq.png'
import br from '../../assets/br.png'
import wb from '../../assets/wb.png'
import wk from '../../assets/wk.png'
import wn from '../../assets/wn.png'
import wp from '../../assets/wp.png'
import wq from '../../assets/wq.png'
import wr from '../../assets/wr.png'

type ColoredChessPiece = `${'b' | 'w'}${PieceType}`

const IMAGE_URLS: Record<ColoredChessPiece, string> = {
	bk,
	bb,
	bn,
	bp,
	bq,
	br,
	wb,
	wk,
	wn,
	wp,
	wq,
	wr,
}

export const getChessPieceImageUrl = ({ color, type }: Piece): string =>
	IMAGE_URLS[`${color}${type}`]
