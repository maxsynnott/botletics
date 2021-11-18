import { useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import { FC, useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'

interface Props {
	title: string
}

export const Layout: FC<Props> = ({ title, children }) => {
	const largeScreen = useMediaQuery('(min-width:992px)')
	const [sidebarOpen, setSidebarOpen] = useState(false)

	const toggleSidebarOpen = () => setSidebarOpen(!sidebarOpen)

	return (
		<Box>
			<Header
				title={title}
				largeScreen={largeScreen}
				toggleSidebarOpen={toggleSidebarOpen}
			/>

			<Box sx={{ display: 'flex', height: '100%' }}>
				<Sidebar largeScreen={largeScreen} open={sidebarOpen} />
				<Box sx={{ flexGrow: 1, overflow: 'auto' }}>{children}</Box>
			</Box>
		</Box>
	)
}
