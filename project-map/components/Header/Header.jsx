'use client';

import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useRouter} from 'next/navigation';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import MapIcon from '@mui/icons-material/Map';
import {AppBar, Box, Button, Toolbar, IconButton, Typography, InputBase, MenuItem, Menu} from '@mui/material';
import {headerButtons, menuItem} from '@/styles/MUIStyleOverrides';


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

const SearchIconWrapper = styled('div')(({ theme }) => ({
   padding: theme.spacing(0, 2),
   height: '100%',
   position: 'absolute',
   pointerEvents: 'none',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: 'inherit',
   '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
         width: '20ch',
      },
   },
}));

function Header(props) {
   const [anchorEl, setAnchorEl] = useState(null);
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
   const router = useRouter();
   const places = useSelector(state => state.places.allPlaces);

   const [searchInputValue, setSearchInputValue] = useState('');
   const [searchOptions, setSearchOptions] = useState([]);

   const userName = 'kremisperi';
   const userId = '0sUwkwkBH5cBrX6JU6Da';
   // const userId = undefined;

   useEffect(() => {
      setSearchOptions( places.map(place => place.title));
   }, [places]);

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
               <>
                  <MenuItem sx={menuItem} onClick={() => {router.push(`/${userName}/my_map`), handleMobileMenuClose();}}>My Map</MenuItem>
                  <MenuItem sx={menuItem} onClick={() => {router.push(`/${userName}/my_memories`), handleMobileMenuClose();}}>My Memories</MenuItem>
                  <MenuItem sx={menuItem} onClick={() => {router.push(`/${userName}/profile`), handleMobileMenuClose();}}>My Profile</MenuItem>
               </>
               :
               <>
                  <MenuItem sx={menuItem} onClick={() => {router.push('/sign_in'), handleMobileMenuClose();}}>Sign In</MenuItem>
                  <MenuItem sx={menuItem} onClick={() => {router.push('/sign_up'), handleMobileMenuClose();}}>Sign Up</MenuItem>
               </>
         }
      </Menu>
   );

   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar position="static" sx={{backgroundColor: 'header.bg', width: '100vw'}}>
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
                  <SearchIconWrapper>
                     <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                     placeholder="Search…"
                     inputProps={{ 'aria-label': 'search' }}
                  />
               </Search>
               <Box sx={{ flexGrow: 1 }} />
               <Box sx={{ display: { xs: 'none', md: 'flex' }, marginRight: '15px' }}>
                  {userId ?
                     <>
                        <Button onClick={() => router.push(`/${userName}/my_map`)} sx={headerButtons}>My Map</Button>
                        <Button onClick={() => router.push(`/${userName}/my_memories`)} sx={headerButtons}>My Memories</Button>
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
            </Toolbar>
         </AppBar>
         {renderMobileMenu}
         {renderMenu}
      </Box>
   );
}

export default Header;