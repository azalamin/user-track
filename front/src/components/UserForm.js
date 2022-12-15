import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserForm.css';

const UserForm = () => {
	const [sectors, setSectors] = useState({});
	const [age, setAge] = useState('');
	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();
		console.log(e);
	};

	const handleChange = event => {
		setAge(event.target.value);
	};

	useEffect(() => {
		fetch('http://localhost:5000/sector')
			.then(res => res.json())
			.then(data => {
				setSectors(data[0]);
			});
	}, [setSectors]);

	console.log(sectors);

	const [checked, setChecked] = React.useState([0]);

	return (
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
					borderRadius='1rem'
				>
					<Typography color='#4B4B4B' fontSize='1rem' lineHeight='1.3em'>
						Please enter your name and pick the Sectors you are currently involved in.
					</Typography>
					<form onSubmit={handleSubmit} className='form'>
						<TextField required id='outlined-required' label='Name' defaultValue='Hello World' />
						<FormControl
							fullWidth
							sx={{
								marginY: '1rem',
							}}
						>
							<InputLabel id='demo-simple-select-label'>Sectors</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								className='sector-container'
								value={age}
								label='Age'
								onChange={handleChange}
							>
								{/* <MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem> */}
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
						<FormControlLabel
							control={<Checkbox color='success' name='gilad' />}
							label='Agree to terms'
						/>
						<Button
							variant='contained'
							type='submit'
							sx={{
								backgroundColor: '#F3A613',
								width: { md: '30%', xs: '100%' },
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
									marginRight: '-5px',
								}}
							/>
						}
					>
						Back to home
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default UserForm;
