import {
	Box,
	Container,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Paper,
	Typography,
} from '@mui/material'
import { useBotLeaderboard } from '../hooks/queries/useBotLeaderboard'
import { LoadingPage } from './LoadingPage'
import { FaTrophy } from 'react-icons/fa'
import { useHistory } from 'react-router'

const displayPosition = (index: number) => {
	switch (index) {
		case 0:
			return <FaTrophy color="gold" />
		case 1:
			return <FaTrophy color="silver" />
		case 2:
			return <FaTrophy color="brown" />
		default:
			return <Typography>{index + 1}</Typography>
	}
}

export const BotsLeaderboardPage = () => {
	const history = useHistory()
	const { bots, isLoading } = useBotLeaderboard()

	if (isLoading) return <LoadingPage />
	if (!bots) throw new Error('Bots not found')

	return (
		<Container maxWidth="sm" sx={{ py: 3 }}>
			<Paper>
				<List>
					{bots.map((bot, index) => (
						<ListItem key={bot.id}>
							<ListItemButton
								onClick={() => {
									history.push(`/bots/${bot.id}`)
								}}
							>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										width: '100%',
									}}
								>
									<Box sx={{ display: 'flex' }}>
										<ListItemAvatar
											sx={{
												display: 'flex',
												alignItems: 'center',
												minWidth: 36,
											}}
										>
											{displayPosition(index)}
										</ListItemAvatar>
										<ListItemText primary={bot.name} />
									</Box>
									<Typography>{bot.elo}</Typography>
								</Box>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Paper>
		</Container>
	)
}
