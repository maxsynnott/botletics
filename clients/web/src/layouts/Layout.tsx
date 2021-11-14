import { Box } from '@mui/system'
import { FC } from 'react'
import { Sidebar } from '../components/Sidebar'

export const Layout: FC = ({ children }) => {
	return (
		<Box display="flex">
			<Sidebar />
			<Box flexGrow={1}>{children}</Box>
		</Box>
	)
}
