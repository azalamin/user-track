import SaveIcon from '@mui/icons-material/Save';
import {
    Box,
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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/UserForm.css';
import Loading from './Loading';

const EditForm = ({ open, handleClose, currentUser, loading, setDeleted }) => {
	const [sectors, setSectors] = useState({});
	const [sector, setSector] = useState(currentUser?.sector);
	const navigate = useNavigate();
	const [checked, setChecked] = useState(false);
	const [nameError, setNameError] = useState('');
	const [sectorError, setSectorError] = useState('');
	const [name, setName] = useState(currentUser?.name);

	useEffect(() => {
		fetch('https://user-tracker-server-jatwd96wu-azalamin.vercel.app/sector')
			.then(res => res.json())
			.then(data => {
				setSectors(data[0]);
			});
	}, [setSectors]);

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
			fetch(`https://user-tracker-server-jatwd96wu-azalamin.vercel.app/user/${currentUser?._id}`, {
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(userData),
			})
				.then(res => res.json())
				.then(data => {
					if (data?.modifiedCount) {
						toast.success('Successfully user info updated!');
						setName('');
						setSector('');
						setDeleted(data);
					} else {
						toast.error('Failed to update user info');
					}
					handleClose();
				});
		}
	};

	return loading ? (
		<Loading />
	) : (
		<div>
			<Dialog open={open} onClose={handleClose} aria-labelledby='draggable-dialog-title'>
				<DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
					Edit the info
				</DialogTitle>
				<DialogContent>
					<Box borderRadius='1rem'>
						<Typography color='#4B4B4B' fontSize='1rem' lineHeight='1.3em'>
							Please enter your name and pick the Sectors you are currently involved in.
						</Typography>
						<form onSubmit={handleSubmit} className='form'>
							<TextField
								id='outlined-required'
								// label='Name'
								defaultValue={currentUser.name}
								name='name'
								onChange={e => setName(e.target.value)}
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
									defaultValue={currentUser.sector}
									onChange={e => setSector(e.target.value)}
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
					</Box>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default EditForm;
