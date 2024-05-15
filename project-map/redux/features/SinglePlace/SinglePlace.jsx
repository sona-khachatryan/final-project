'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useParams, usePathname, useRouter} from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {changeStatus, getSinglePlace, getStatus} from '@/redux/features/SinglePlace/singlePlaceThunks';
import {
   Modal,
   Box,
   Typography,
   FormControl,
   Grid,
   IconButton,
   InputLabel,
   MenuItem,
   Select,
   Link as MUILink,
   CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditDeleteBtns from '@/components/EditDeleteBtns/EditDeleteBtns';
import SinglePlaceEditMode from '@/redux/features/SinglePlace/SinglePlaceEditMode';
import {setIsInEditMode} from '@/redux/features/SinglePlace/singlePlaceSlice';
import {focusedField, menuItem, modalBox} from '@/styles/MUIStyleOverrides';


function SinglePlace() {
   const router = useRouter();
   const pathname = usePathname();
   const params = useParams();
   const placeId = params.placeId;
   const dispatch = useDispatch();
   const currentPlace = useSelector(state => state.singlePlace.data);
   const visitStatus = useSelector(state => state.singlePlace.status);
   const isInEditMode = useSelector(state => state.singlePlace.isInEditMode);
   const {id: userId, isAdmin, userName} = useSelector(state => state.user);

   useEffect(() => {
      dispatch(getSinglePlace({placeId}));
      dispatch(getStatus({placeId, userId}));
   }, [dispatch, placeId, userId]);


   const [selectStatus, setSelectStatus] = useState('');
   useEffect(() => {
      setSelectStatus(visitStatus);
   }, [visitStatus]);

   const handleStatusChange = (e) => {
      dispatch(changeStatus({userId, thePlace: currentPlace, newStatus: e.target.value, oldStatus: visitStatus }));
   };

   const handleClose = () => {
      if(isInEditMode) {
         dispatch(setIsInEditMode(false));
      } else {
         router.back();
      }
   };

   return (
      <>
         <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={modalBox}>
               <IconButton sx={{position: 'absolute', top: 10, right: 10, color: 'text.primary'}} onClick={handleClose} aria-label="delete" color="black" size='small'>
                  <CloseIcon/>
               </IconButton>

               { currentPlace?.title ?
                  <>
                     {!isInEditMode
                        ?
                        <>
                           <Grid container
                              direction="row"
                              columnSpacing={-4}
                              justifyContent="space-around">
                              <Grid item xs={12} md={7}>
                                 <img style={{maxWidth: 400, maxHeight: 300}} src={currentPlace?.image}/>
                                 <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color: 'text.primary'}}>
                                    {currentPlace?.title}
                                 </Typography>
                                 <Typography variant='subtitle1' sx={{color: 'text.primary', font: 'inherit'}}>
                                       Coordinates {`${currentPlace?.coordinates?.lat} ${currentPlace?.coordinates?.lon}`}
                                 </Typography>

                                 {userId
                                    ?
                                    <Box sx={{ minWidth: 120, maxWidth: 200, height: '35px', margin: '10px 0' }} >
                                       <FormControl fullWidth sx={{color:'text.primary', ...focusedField}}>
                                          <InputLabel id="demo-simple-select-label" sx={{color:'text.primary'}}>Status</InputLabel>
                                          <Select
                                             labelId="demo-simple-select-label"
                                             id="demo-simple-select"
                                             defaultValue={selectStatus}
                                             value={selectStatus}
                                             label="Status"
                                             onChange={handleStatusChange}
                                             sx={{color:'text.primary',}}
                                          >
                                             <MenuItem value='unvisited' sx={menuItem}>Unvisited</MenuItem>
                                             <MenuItem value='visited' sx={menuItem}>Visited</MenuItem>
                                             <MenuItem value='toBeVisited' sx={menuItem}>To Be Visited</MenuItem>
                                          </Select>
                                       </FormControl>
                                    </Box>
                                    :
                                    ''
                                 }

                                 {
                                    userId
                                       ?
                                       <Typography variant='subtitle1' onClick={() =>  router.push(`/${userName}/my_memories/${placeId}`)} sx={{
                                          color: 'text.primary',
                                          display: 'inline-block',
                                          font: 'inherit',
                                          textDecoration: 'none',
                                          // transition: 'text-decoration 0.3s ease',
                                          '&:hover': {
                                             textDecoration: 'underline',
                                          },}}>
                                          My memories
                                       </Typography>
                                       :
                                       <Typography 
                                          variant='subtitle1'
                                          onClick={() => router.push('/sign_in')}
                                          sx={{
                                             backgroundColor: 'text.primary',
                                             color: 'background.primary',
                                             font: 'inherit',
                                             width: 'fit-content',
                                             padding: '6px',
                                             margin: '10px 3px 5px 0',
                                             borderRadius: '3px',
                                             textDecoration: 'none',
                                             // transition: 'text-decoration 0.3s ease',
                                             '&:hover': {
                                                backgroundColor: 'button.main',
                                                cursor: 'pointer'
                                             }
                                          }}>
                                             Sign in to record your memories.
                                       </Typography>
                                 }

                              </Grid>
                              <Grid item xs={12} md={5}>
                                 <Typography variant='subtitle1' id="modal-modal-description" sx={{color: 'text.primary', font: 'inherit', display: { xs: 'none', sm: 'none', md: 'block'}, maxHeight: '445px', overflowY: 'auto' }}>
                                    {currentPlace?.extract}
                                 </Typography>
                                 {currentPlace?.url ?  
                                    <MUILink href={currentPlace?.url} target="_blank" rel="noopener noreferrer" underline='always' color='text.primary' sx={{color: 'text.primary', marginTop: '15px'}}>
                                    Learn more
                                    </MUILink>
                                    :
                                    ''
                                 }
                              </Grid>
                           </Grid>
                           {isAdmin ? <EditDeleteBtns/> : ''}
                        </>
                        :
                        <SinglePlaceEditMode/>
                     }
                  </>
                  :
                  <CircularProgress sx={{color:'text.primary'}} />
               }
            </Box>
         </Modal>
      </>
   );
}

export default SinglePlace;