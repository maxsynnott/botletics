import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'

interface Props {
	error: Error
	resetErrorBoundary: () => void
}

export const ErrorFallback: FC<Props> = ({ error, resetErrorBoundary }) => {
	return (
		<Box>
			<Typography>Something went wrong:</Typography>
			<Typography whiteSpace="pre">{error.message}</Typography>
			<Button onClick={resetErrorBoundary}>Try again</Button>
		</Box>
	)
}
