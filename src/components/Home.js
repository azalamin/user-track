import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { experimentalStyled as styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import EditForm from './EditForm';
import Loading from './Loading';
import NavBar from './Navbar';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(2),
	// textAlign: 'center',
	color: '#4B4B4B',
}));

const Home = () => {
	const [userInfo, setUserInfo] = useState([]);
	const [deleted, setDeleted] = useState({});
	const [open, setOpen] = React.useState(false);
	const [currentUser, setCurrentUser] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetch('https://user-tracker-server-jatwd96wu-azalamin.vercel.app/user-info')
			.then(res => res.json())
			.then(data => {
				setUserInfo(data);
			});
	}, [deleted]);

	const handleDelete = id => {
		fetch(`https://user-tracker-server-jatwd96wu-azalamin.vercel.app/user/${id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => {
				setDeleted(data);
				toast.success('Task Deleted Successfully');
			});
	};

	const handleClickOpen = (id) => {
		setOpen(true);
		setLoading(true)
		fetch(`https://user-tracker-server-jatwd96wu-azalamin.vercel.app/my-info/${id}`)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setCurrentUser(data);
				setLoading(false)
			});
	};

	const handleClose = () => {
		setOpen(false);
	};

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
				{userInfo ? <Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={{ xs: 4, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
						{userInfo?.map((card, index) => (
							<Grid item xs={4} sm={4} md={4} key={index} >
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
										{card?.name}
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
										{card?.sector}
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
										<Button
											onClick={() => handleClickOpen(card._id)}
											size='small'
											variant='outlined'
											startIcon={<EditIcon />}
										>
											Edit
										</Button>
										<Button
											onClick={() => handleDelete(card?._id)}
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
				</Box> : <Loading />}
			</Box>
			<EditForm
				open={open}
				handleClose={handleClose}
				currentUser={currentUser}
				loading={loading}
				setDeleted={setDeleted}
			/>
		</Box>
	);
};

export default Home;
