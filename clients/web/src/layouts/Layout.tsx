import { Box } from '@mui/system'
import { FC } from 'react'
import { Sidebar } from '../components/Sidebar'

export const Layout: FC = ({ children }) => {
	return (
		<Box sx={{ display: 'flex', height: '100%' }}>
			<Sidebar />
			<Box sx={{ flexGrow: 1, overflow: 'auto' }}>{children}</Box>
		</Box>
	)
}
