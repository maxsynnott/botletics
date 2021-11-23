import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import { FC, useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'

export const Layout: FC = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	const toggleSidebarOpen = () => setSidebarOpen(!sidebarOpen)

	return (
		<Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<Header toggleSidebarOpen={toggleSidebarOpen} />
			<Toolbar variant="dense" /> {/* Padding */}
			<Box sx={{ display: 'flex', flexGrow: 1 }}>
				<Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
				<Box sx={{ flexGrow: 1, overflow: 'auto' }}>{children}</Box>
			</Box>
		</Box>
	)
}
