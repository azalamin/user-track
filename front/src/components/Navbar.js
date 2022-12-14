import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const navigate = useNavigate();

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = event => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton size='large' aria-label='show 4 new mails' color='inherit'>
					<Badge badgeContent={0} color='error'>
						<PersonIcon />
					</Badge>
				</IconButton>
				<p>Add User</p>
			</MenuItem>
			<MenuItem>
				<IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
					<Badge badgeContent={0} color='error'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size='large'
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position='static'
				sx={{
					backgroundColor: '#F3A613',
					paddingY: '0.5rem',
				}}
			>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='open drawer'
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: '700' }}
					>
						User Tracker
					</Typography>

					<Box sx={{ flexGrow: 1 }} />
					<Box gap='1rem' sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
						<Button
							onClick={() => navigate('/add-user')}
							sx={{
								background: 'white',
								paddingX: '20px',
								height: '40px',
								boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
								fontWeight: '600',
								transition: '0.5s',
								color: '#4B4B4B',
								'&:hover': {
									background: '#d9d2d2',
									color: 'black',
									boxShadow: 'none',
								},
							}}
						>
							Add User
						</Button>
						<IconButton
							size='large'
							aria-label='show 17 new notifications'
							color='inherit'
							sx={{
								background: 'rgba(0, 0, 0, 0.04)',
								'&:hover': {
									background: 'rgba(0, 0, 0, 0.08)',
								},
							}}
						>
							<Badge badgeContent={0} color='error'>
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							size='large'
							edge='end'
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='inherit'
							sx={{
								background: 'rgba(0, 0, 0, 0.04)',
								'&:hover': {
									background: 'rgba(0, 0, 0, 0.08)',
								},
							}}
						>
							<AccountCircle />
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
};

export default NavBar;
