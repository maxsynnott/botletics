import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'

export const LoadingPage = () => {
	return (
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<CircularProgress size={64} />
		</Box>
	)
}
