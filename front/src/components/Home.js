import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { experimentalStyled as styled } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(2),
	// textAlign: 'center',
	color: '#4B4B4B',
}));

const Home = () => {
	const navigate = useNavigate();
    const data = [
        {
            name: 'Asrafuzzaman',
            sector: 'Computer science and Engineering',
            id: 1
        },
        {
            name: 'Asrafuzzaman',
            sector: 'Computer science and Engineering',
            id: 2
        },
        {
            name: 'Asrafuzzaman',
            sector: 'Computer science and Engineering',
            id: 3
        },
        {
            name: 'Asrafuzzaman',
            sector: 'Computer science and Engineering',
            id: 4
        },
        {
            name: 'Asrafuzzaman',
            sector: 'Computer science and Engineering',
            id: 5
        },
        {
            name: 'Asrafuzzaman',
            sector: 'Computer science and Engineering',
            id: 6
        },
    ]
    return (
			<Box>
				<NavBar />
				<Box
					margin={{
						xl: '5rem 2rem',
						md: '5rem 2rem',
						sm: '5rem 2rem',
						xs: '3rem 1rem',
					}}
				>
					<Box sx={{ flexGrow: 1 }}>
						<Grid container spacing={{ xs: 4, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
							{data.map((card, index) => (
								<Grid item xs={4} sm={4} md={4} key={index}>
									<Item
										sx={{
											textAlign: { xs: 'center', md: 'left' },
											transition: '0.5s',
											'&:hover': {
												boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
											},
										}}
									>
										<Typography
											fontSize={{
												md: '1.2rem',
												xs: '1.1rem',
											}}
											lineHeight='1.4em'
										>
											<span
												style={{
													fontWeight: '600',
												}}
											>
												Name:{' '}
											</span>
											{card.name}
										</Typography>
										<Typography
											fontSize={{
												md: '1.2rem',
												xs: '1.1rem',
											}}
											lineHeight='1.4em'
										>
											<span
												style={{
													fontWeight: '600',
												}}
											>
												Sector:
											</span>{' '}
											{card.sector}
										</Typography>
										<Stack
											direction='row'
											spacing={2}
											mt='1.5rem'
											justifyContent={{
												md: 'flex-start',
												xs: 'center',
											}}
										>
											<Button onClick={() => navigate('/edit')} size='small' variant='outlined' startIcon={<EditIcon />}>
												Edit
											</Button>
											<Button
												variant='contained'
												size='small'
												sx={{
													backgroundColor: '#F3A613',
												}}
												endIcon={<DeleteIcon />}
											>
												Delete
											</Button>
										</Stack>
									</Item>
								</Grid>
							))}
						</Grid>
					</Box>
				</Box>
			</Box>
		);
};

export default Home;