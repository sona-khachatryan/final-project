'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useParams, usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {changeStatus, getSinglePlace, getStatus} from '@/redux/features/SinglePlace/singlePlaceThunks';
import {ButtonGroup, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Link as MUILink} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '80vw',
   height: '80vh',
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4
};

function SinglePlace() {
   const router = useRouter();
   const params = useParams();
   const placeId = params.placeId;
   const dispatch = useDispatch();
   const currentPlace = useSelector(state => state.singlePlace.data);
   const visitStatus = useSelector(state => state.singlePlace.status);

   const userId = '0sUwkwkBH5cBrX6JU6Da';
   const userName = 'kremisperi';

   console.log(placeId, 'place outside useeffect');

   useEffect(() => {
      console.log(placeId, 'placeid');
      dispatch(getSinglePlace({placeId}));
      dispatch(getStatus({placeId, userId}));
   }, [placeId]);


   const [selectStatus, setSelectStatus] = useState('');

   useEffect(() => {
      setSelectStatus(visitStatus);
   }, [visitStatus]);
   const handleStatusChange = (e) => {
      dispatch(changeStatus({userId, thePlace: currentPlace, newStatus: e.target.value, oldStatus: visitStatus }));
   };

   console.log(currentPlace, 'singlePlace outside useeffect');
   const handleClose = () => {
      router.back();
   };

   return (
      <>
         <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            {currentPlace.title ?  (<>
               <Box sx={style}>
                  {/*TO DO: edit delete close*/}
                  <IconButton sx={{position: 'absolute', top: 0, right: 0}} onClick={handleClose} aria-label="delete" color="black" size='small'>
                     <CloseIcon/>
                  </IconButton>
                  <ButtonGroup variant="contained" aria-label="Basic button group">
                     <Button onClick={() => console.log(window.innerWidth, 'inner')}>One</Button>
                     <Button>Two</Button>
                  </ButtonGroup>
                  <Grid container
                     direction="row"
                     justifyContent="space-around">
                     <Grid item xs={12} md={7}>
                        <img style={{width: 400}} src={currentPlace?.image}/>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                           {currentPlace?.title}
                        </Typography>
                        <Typography>
                           {`Coordinates ${currentPlace?.coordinates?.lat} ${currentPlace?.coordinates?.lon}`}
                        </Typography>

                        {userId
                           ?
                           <Box sx={{ minWidth: 120, maxWidth: 200, height: '35px', margin: '10px 0' }} >
                              <FormControl fullWidth >
                                 <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                 <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={selectStatus}
                                    value={selectStatus}
                                    label="Status"
                                    onChange={handleStatusChange}
                                 >
                                    <MenuItem value='unvisited'>Unvisited</MenuItem>
                                    <MenuItem value='visited'>Visited</MenuItem>
                                    <MenuItem value='toBeVisited'>To Be Visited</MenuItem>
                                 </Select>
                              </FormControl>
                           </Box>
                           :
                           ''
                        }

                        {
                           userId
                              ?
                              <MUILink underline='hover' color='text.primary'>
                                 <Link style={{textDecoration: 'none', color: 'black'}} href={`/${userName}/my_reviews/${placeId}`}>
                                    Your review
                                 </Link>
                              </MUILink>
                              :
                              <Typography>
                                 Sign in to leave a review.
                              </Typography>
                        }

                     </Grid>
                     <Grid item xs={12} md={5}>
                        <Typography variant='caption' id="modal-modal-description" sx={{ display: { xs: 'none', sm: 'none', md: 'blocked'}, }}>
                           {currentPlace?.extract}
                        </Typography>
                        <MUILink href={currentPlace?.url} target="_blank" rel="noopener noreferrer" underline='always' sx={{color: 'text.primary'}}>
                           Learn more
                        </MUILink>
                     </Grid>
                  </Grid>
               </Box>
            </>) :
               // TO DO: show loader
               <div>Loading ...</div>}
            
         </Modal>
      </>
   );
}

export default SinglePlace;