import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/UserForm.css';
import Loading from './Loading';

const UserForm = () => {
	const [sectors, setSectors] = useState({});
	const [name, setName] = useState('');
	const [sector, setSector] = useState('');
	const navigate = useNavigate();
	const [checked, setChecked] = useState(false);
	const [nameError, setNameError] = useState('');
	const [sectorError, setSectorError] = useState('');
	const location = useLocation();

	useEffect(() => {
		fetch('https://user-track.vercel.app/sector')
			.then(res => res.json())
			.then(data => {
				setSectors(data[0]);
			});
	}, [setSectors]);

	const handleName = event => {
		setName(event.target.value);
	};

	const handleSector = event => {
		setSector(event.target.value);
	};

	const handleTerms = event => {
		setChecked(event.target.checked);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const userData = {
			name: name,
			sector: sector,
			checked: checked,
		};
		setNameError('');
		setSectorError('');

		if (name === '') {
			setNameError('Please give a name');
		}
		if (sector === '') {
			setSectorError('Please select a sector');
		}

		if (name !== '' && sector !== '') {
			fetch('https://user-track.vercel.app/user', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(userData),
			})
				.then(res => res.json())
				.then(data => {
					if (data?.insertedId) {
						toast.success('Successfully user info added!');
						setName('');
						setSector('');
						e.target.reset();
					} else {
						toast.error('Failed to add user info');
					}
				});
		}
	};

	return (
		<>
			{!sectors ? (
				<Loading />
			) : (
				<Box bgcolor='#A3A3A3' height='100vh'>
					<Box
						marginX={{
							xl: '2rem',
							md: '2rem',
							sm: '2rem',
							xs: '1rem',
						}}
						position='relative'
						top={{
							md: '20%',
							xs: '30%',
						}}
					>
						<Box
							width={{
								md: '50%',
								xs: '100%',
							}}
							margin='auto'
							bgcolor='#FFFFFF'
							padding={{
								md: '2rem',
								xs: '1.5rem',
							}}
							sx={{
								boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
							}}
							borderRadius='1rem'
						>
							<Typography color='#4B4B4B' fontSize='1rem' lineHeight='1.3em'>
								Please enter your name and pick the Sectors you are currently involved in.
							</Typography>
							<form onSubmit={handleSubmit} className='form'>
								<TextField
									id='outlined-required'
									label='Name'
									defaultValue=''
									name='name'
									onChange={handleName}
								/>
								{nameError ? (
									<FormHelperText
										sx={{
											margin: '0 !important',
											color: 'rgb(211, 47, 47)',
										}}
									>
										{nameError}
									</FormHelperText>
								) : (
									''
								)}
								<FormControl fullWidth>
									<InputLabel id='demo-simple-select-label'>Sectors</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										className='sector-container'
										label='Age'
										onChange={handleSector}
									>
										<FormLabel
											sx={{
												paddingX: '1rem',
												fontWeight: '700',
												color: 'black',
											}}
										>
											Manufacturing
										</FormLabel>
										{sectors?.manufacturing?.map((manufacture, index) => (
											<MenuItem
												sx={{
													paddingLeft: '2rem !important',
												}}
												key={index}
												value={manufacture}
											>
												{manufacture}
											</MenuItem>
										))}
										<FormLabel
											sx={{
												paddingLeft: '1rem',
												fontWeight: '700',
												color: 'black',
												marginTop: '0.6rem',
												display: 'block',
											}}
										>
											Food and Beverage
										</FormLabel>
										{sectors?.foodBeverage?.map((food, index) => (
											<MenuItem
												sx={{
													paddingLeft: '2rem !important',
												}}
												key={index}
												value={food}
											>
												{food}
											</MenuItem>
										))}
										<FormLabel
											sx={{
												paddingX: '1rem',
												fontWeight: '700',
												color: 'black',
												marginTop: '0.6rem',
												display: 'block',
											}}
										>
											Machinary
										</FormLabel>
										{sectors?.machinary?.map((machinary, index) => (
											<MenuItem
												sx={{
													paddingLeft: '2rem !important',
												}}
												key={index}
												value={machinary}
											>
												{machinary}
											</MenuItem>
										))}
										<FormLabel
											sx={{
												paddingLeft: '2rem',
												fontWeight: '700',
												color: 'black',
												display: 'block',
												marginTop: '0.5rem',
											}}
										>
											Maritime
										</FormLabel>
										{sectors?.maritime?.map((Maritime, index) => (
											<MenuItem
												sx={{
													paddingLeft: '3rem !important',
												}}
												key={index}
												value={Maritime}
											>
												{Maritime}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								{sectorError ? (
									<FormHelperText
										sx={{
											margin: '0 !important',
											color: 'rgb(211, 47, 47)',
										}}
									>
										{sectorError}
									</FormHelperText>
								) : (
									''
								)}
								<FormControlLabel
									control={<Checkbox onChange={handleTerms} color='success' name='term' />}
									label='Agree to terms'
								/>
								<Button
									variant='contained'
									disabled={!checked}
									type='submit'
									sx={{
										backgroundColor: '#F3A613',
										width: { md: '40%', xs: '100%' },
										margin: 'auto',
										fontWeight: '600',
									}}
									endIcon={<SaveIcon />}
								>
									Save
								</Button>
							</form>
							<Button
								onClick={() => navigate('/')}
								sx={{
									textTransform: 'none',
									display: 'flex',
									alignItems: 'center',
									fontSize: '0.8rem',
									marginTop: '1rem',
									color: '#4B4B4B',
								}}
								startIcon={
									<HomeIcon
										sx={{
											fontSize: '0.5rem',
											marginRight: '-3px',
										}}
									/>
								}
							>
								Back to home
							</Button>
						</Box>
					</Box>
				</Box>
			)}
		</>
	);
};

export default UserForm;
