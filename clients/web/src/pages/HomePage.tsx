import { Typography } from '@mui/material'
import { FC, useEffect } from 'react'

interface Props {
	setTitle: (title: string) => void
}

export const HomePage: FC<Props> = ({ setTitle }) => {
	useEffect(() => setTitle('Botletics'), [])

	return <Typography>Home</Typography>
}
