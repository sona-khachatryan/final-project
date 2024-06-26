'use client';

import {useState} from 'react';
import {useSelector} from 'react-redux';
import {useRouter} from 'next/navigation';
import { styled, alpha } from '@mui/material/styles';
import MoreIcon from '@mui/icons-material/MoreVert';
import MapIcon from '@mui/icons-material/Map';
import {AppBar, Box, Button, Toolbar, IconButton, Typography, MenuItem, Menu} from '@mui/material';
import {headerButtons, menuItem} from '@/styles/MUIStyleOverrides';
import CustomSearch from '@/components/CustomSearch/CustomSearch';
import ThemeSwitch from '@/components/ThemeSwitch/ThemeSwitch';


const Search = styled('div')(({ theme }) => ({
   position: 'relative',
   borderRadius: theme.shape.borderRadius,
   backgroundColor: alpha(theme.palette.common.white, 0.15),
   '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
   },
   marginRight: theme.spacing(2),
   marginLeft: 0,
   width: '100%',
   [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
   },
}));

function Header(props) {
   const [anchorEl, setAnchorEl] = useState(null);
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
   const router = useRouter();
   const {id: userId, userName} = useSelector(state => state.user);

   const isMenuOpen = Boolean(anchorEl);
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

   const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
   };

   const handleMobileMenuOpen = (event) => {
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
         {
            userId ?
               <Box>
                  <MenuItem sx={menuItem} onClick={() => {router.push(`/${userName}/my_places`), handleMobileMenuClose();}}>My Places</MenuItem>
                  <MenuItem sx={menuItem} onClick={() => {router.push(`/${userName}/profile`), handleMobileMenuClose();}}>My Profile</MenuItem>
               </Box>
               :
               <Box>
                  <MenuItem sx={menuItem} onClick={() => {router.push('/sign_in'), handleMobileMenuClose();}}>Sign In</MenuItem>
                  <MenuItem sx={menuItem} onClick={() => {router.push('/sign_up'), handleMobileMenuClose();}}>Sign Up</MenuItem>
               </Box>
         }
      </Menu>
   );

   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="fixed" elevation={0} sx={{backgroundColor: 'header.bg', width: '100vw'}}>
            <Toolbar>
               <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2, color: 'header.text' }}
                  onClick={() => router.push('/')}
               >
                  <MapIcon/>
               </IconButton>
               <Box sx={{marginBottom: '5px'}}>
                  <Typography
                     variant="h6"
                     noWrap
                     component="div"
                     sx={{
                        display: { xs: 'none', sm: 'block' },
                        color: 'header.text',
                        marginBottom: 0,
                     }}
                  >
                  Numinous
                  </Typography>
                  <Typography
                     variant="caption"
                     noWrap
                     component="div"
                     sx={{
                        display: { xs: 'none', sm: 'block' },
                        font: 'inherit',
                        color: 'header.text',
                        fontSize: '13px',
                        marginTop: 0,
                     }}
                  >
                  My Travel Journal
                  </Typography>
               </Box>
               <Search>
                  <CustomSearch/>
               </Search>
               <Box sx={{ flexGrow: 1 }} />
               <Box sx={{ display: { xs: 'none', md: 'flex' }, marginRight: '15px' }}>
                  {userId ?
                     <>
                        <Button onClick={() => router.push(`/${userName}/my_places`)} sx={headerButtons}>My Places</Button>
                        <Button onClick={() => router.push(`/${userName}/profile`)} sx={headerButtons}>My Profile</Button>
                     </>
                     :
                     <>
                        <Button onClick={() => router.push('/sign_in')} sx={headerButtons}>Sign In</Button>
                        <Button onClick={() => router.push('/sign_up')} sx={headerButtons}>Sign Up</Button>
                     </>
                  }
               </Box>
               <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                     size="large"
                     aria-label="show more"
                     aria-controls={mobileMenuId}
                     aria-haspopup="true"
                     onClick={handleMobileMenuOpen}
                     color="header.text"
                     sx={{color: 'header.text'}}
                  >
                     <MoreIcon />
                  </IconButton>
               </Box>
               <ThemeSwitch/>
            </Toolbar>
         </AppBar>
         {renderMobileMenu}
         {renderMenu}
      </Box>
   );
}

export default Header;