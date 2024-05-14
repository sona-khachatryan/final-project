'use client';

import React, {useEffect, useState} from 'react';
import {
   Box, Button, CircularProgress, Divider,
   FormControl,
   Grid,
   IconButton,
   InputLabel,
   Link as MUILink,
   MenuItem,
   Modal, Paper,
   Select, Stack,
   Typography
} from '@mui/material';
import {focusedField, menuItem, modalBox, regularButton} from '@/styles/MUIStyleOverrides';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import EditDeleteBtns from '@/components/EditDeleteBtns/EditDeleteBtns';
import SinglePlaceEditMode from '@/redux/features/SinglePlace/SinglePlaceEditMode';
import {useRouter} from 'next/navigation';
import CustomSearch from '@/components/CustomSearch/CustomSearch';
import {useDispatch, useSelector} from 'react-redux';
import {styled} from '@mui/material/styles';
import {getSpecificPlaceList} from '@/redux/features/Places/placesThunks';
import {updateVisitStatus} from '@/redux/features/Places/placesSlice';


const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
}));

function MyPlaces(props) {
   const router = useRouter();
   const {visited, toBeVisited} = useSelector(state => state.places);
   const {id: userId, userName} = useSelector(state =>  state.user);
   const [isSmallScreen, setIsSmallScreen] = useState(false);
   const [placesListed, setPlacesListed] = useState(2);
   const dispatch = useDispatch();

  // const userName = 'kremisperi';

   useEffect(() => {
      dispatch(getSpecificPlaceList({visitStatus: 'visited', userId}));
      dispatch(getSpecificPlaceList({visitStatus: 'toBeVisited', userId}));
   }, [dispatch, userId]);

   useEffect(() => {
      const handleResize = () => {
         setIsSmallScreen(window.innerWidth <= 800);
      };

      handleResize();

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   useEffect(() => {
      if(isSmallScreen) {
         setPlacesListed(2);
      } else {
         setPlacesListed(5);
      }
   }, [isSmallScreen]);
   const handleClose = () => {
      router.push('/');
   };

   const handlePlaceClick = (placeId) => {
      router.push(`/map/${placeId}`);
   };

   const handleViewMore = (visitStatus) => {
      console.log('viewmore clicked');
      router.push(`/${userName}/my_places/${visitStatus}`);
   };

   return (
      <div>
         <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <>
               <Box sx={modalBox}>
                  <IconButton sx={{position: 'absolute', top: 10, right: 10, color: 'text.primary'}} onClick={handleClose} aria-label="delete" color="black" size='small'>
                     <CloseIcon/>
                  </IconButton>

                  <Grid container
                     direction={isSmallScreen ? 'column' : 'row'} 
                     rowGap='20px'
                     justifyContent="space-around">
                     <Grid item>
                        <Typography id="modal-modal-title"
                           variant="h6"
                           component="h2"
                           sx={{
                              color: 'text.primary',
                              display: 'inline',
                              '@media (min-width:200px) and (max-width:800px)': {
                                 fontSize: '16px',
                              },
                           }}>
                           Visited {visited?.length ? visited?.length : ''}
                        </Typography>
                        <Stack
                           direction="column"
                           divider={<Divider orientation="horizontal" flexItem sx={{'&.MuiDivider-root' : {color: 'text.primary'}}} />}
                           spacing={2}
                           sx={{
                              '@media (min-width: 801)': {
                                 minWidth: '400px',
                              }
                           }}
                        >
                           {visited?.length ? visited.slice(0,placesListed).map(place =>
                              <Item
                                 key={place.id}
                                 onClick={() => handlePlaceClick(place.id)}
                                 sx={{
                                    backgroundColor: 'background.secondary',
                                    color: 'header.text',
                                    font: 'inherit',
                                    '@media (min-width: 801)': {
                                       minWidth: '400px',
                                    }
                                 }}>
                                 {place?.title}
                              </Item>
                           ) :
                              <Typography
                                 sx={{
                                    color: 'text.primary',
                                    font: 'inherit'
                                 }}>
                                 {'You haven\'t marked any places as \'Visited\'.'}
                              </Typography>
                           }
                           {visited?.length ?
                              <Button
                                 onClick={() => handleViewMore('visited')}
                                 variant="outlined"
                                 color='button'
                                 sx={{...regularButton, backgroundColor: 'background.secondary',  '&:hover': {
                                    backgroundColor: 'button.green',
                                    color: 'button.text'
                                 },}}>View All</Button>
                              :
                              ''
                           }

                        </Stack>

                     </Grid>
                     <Grid item>
                        <Typography id="modal-modal-title"
                           variant="h6"
                           component="h2"
                           sx={{
                              color: 'text.primary',
                              display: 'inline',
                              '@media (min-width:200px) and (max-width:800px)': {
                                 fontSize: '16px',
                              },
                           }}>
                           To Be Visited {toBeVisited?.length ? toBeVisited?.length : ''}
                        </Typography>
                        <Stack
                           direction="column"
                           divider={<Divider orientation="horizontal" flexItem />}
                           spacing={2}
                        >
                           {toBeVisited?.length ? toBeVisited.slice(0,placesListed).map(place =>
                              <Item
                                 key={place.id}
                                 onClick={() => handlePlaceClick(place.id)}
                                 sx={{
                                    backgroundColor: 'button.main',
                                    color: 'header.text',
                                    font: 'inherit',
                                    '@media (min-width: 801)': {
                                       minWidth: '300px',
                                    }
                                 }}>
                                 {place?.title}
                              </Item>
                           ) :
                              <Typography
                                 sx={{
                                    color: 'text.primary',
                                    font: 'inherit'
                                 }}>
                                 {'You haven\'t marked any places as \'To Be Visited\'.'}
                              </Typography>
                           }
                           {toBeVisited?.length ?
                              <Button
                                 onClick={() => handleViewMore('toBeVisited')}
                                 variant="outlined"
                                 color='button'
                                 sx={{...regularButton}}>View All</Button>
                              :
                              ''
                           }
                        </Stack>
                     </Grid>
                  </Grid>
                

                 
               </Box>
            </>
         </Modal>
      </div>
   );
}

export default MyPlaces;
