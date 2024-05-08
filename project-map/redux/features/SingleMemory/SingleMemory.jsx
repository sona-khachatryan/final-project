import React, {useEffect, useState} from 'react';
import {
   Box, CircularProgress,
   FormControl,
   Grid,
   IconButton,
   InputLabel,
   Link as MUILink,
   MenuItem,
   Modal,
   Select, TextField,
   Typography
} from '@mui/material';
import {focusedField, menuItem, modalBox} from '@/styles/MUIStyleOverrides';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import EditDeleteBtns from '@/components/EditDeleteBtns/EditDeleteBtns';
import SinglePlaceEditMode from '@/redux/features/SinglePlace/SinglePlaceEditMode';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useRouter} from 'next/navigation';
import {getSingleMemory} from '@/redux/features/SingleMemory/memoryThunks';
import {setIsInEditMode} from '@/redux/features/SinglePlace/singlePlaceSlice';
import {enterMemoryEditMode} from '@/redux/features/SingleMemory/memorySlice';
import SingleMemoryEditMode from '@/redux/features/SingleMemory/SingleMemoryEditMode';
import {prompts} from '@/constants/prompts';

const memoryfields = {
   color: 'text.primary',
   font: 'inherit',
   border: '1px solid',
   borderRadius: '3px',
   borderColor: 'text.primary',
   padding: '10px',
   overflowY: 'auto',
   '@media (min-width:300px) and (max-width:800px)': {
      height: '70px',
      fontSize: '13px'
   },
   '@media (min-width:801px)': {
      height: '150px',
   },
};

function SingleMemory(props) {
   const router = useRouter();
   const params = useParams();
   const placeId = params.placeId;
   const dispatch = useDispatch();
   const currentMemory = useSelector(state => state.memories.singleMemory);
   const memoryIsInEditMode = useSelector(state => state.memories.memoryEditMode);
   const userId = '0sUwkwkBH5cBrX6JU6Da';

   useEffect(() => {
      dispatch(getSingleMemory({placeId, userId}));
      console.log('enteredmymemory', 'empty', currentMemory, currentMemory.recorded);
   }, [dispatch, placeId]);

   useEffect(() => {
      if(!currentMemory.recorded) {
         dispatch(enterMemoryEditMode(true));
         console.log('empty so entered edit mode', memoryIsInEditMode);
      } else {
         dispatch(enterMemoryEditMode(false));
      }
   }, [dispatch, currentMemory]);

   const [isSmallScreen, setIsSmallScreen] = useState(false);
   
   useEffect(() => {
      const handleResize = () => {
         setIsSmallScreen(window.innerWidth >= 300 && window.innerWidth <= 800);
      };

      handleResize();

      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

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
            <Box sx={modalBox}>
               <IconButton sx={{position: 'absolute', top: 10, right: 10, color: 'text.primary'}} onClick={handleClose} aria-label="delete" color="black" size='small'>
                  <CloseIcon/>
               </IconButton>
               {
                  memoryIsInEditMode
                     ?
                     <SingleMemoryEditMode/>
                     :
                     //ui
                     //delete function
                     <Box>
                        <Typography id="modal-modal-title"
                           variant="h6"
                           component="h2"
                           sx={{
                              color: 'text.primary',
                              display: 'inline',
                              '@media (min-width:300px) and (max-width:800px)': {
                                 fontSize: '14px',
                                 display: 'block',
                              },
                           }}>
                           {currentMemory?.title}
                        </Typography>
                        <Box sx={{marginLeft: '10px', display: 'inline', '@media (min-width:300px) and (max-width:800px)': {
                           display: 'block', marginLeft: 0
                        },}}>
                           <Typography
                              sx={{
                                 marginRight: '7px',
                                 fontSize: '13px',
                                 color: 'text.primary',
                              }}>
                              Visited on {currentMemory?.visitDate}
                           </Typography>
                        </Box>
                        <Grid container
                           columnSpacing={3}
                           rowSpacing={isSmallScreen ? -2 : 3}
                           direction={isSmallScreen ? 'column' : 'row'}
                           sx={{
                              '& .MuiGrid-root': {
                                 '&.MuiGrid-item': {
                                    paddingTop: '0px',
                                    marginTop: '25px',
                                    '@media (min-width:300px) and (max-width:800px)': {
                                       marginTop: '5px',
                                    },
                                 },
                              },
                           }}>
                           <Grid item xs={6} md={6}>
                              <Typography variant='subtitle1' sx={memoryfields}>
                                 {currentMemory?.reflect}
                              </Typography>
                           </Grid>
                           <Grid item xs={6} md={6} sx={{}}>
                              <Typography variant='subtitle1' sx={memoryfields}>
                                 {currentMemory?.learnOrHistory}
                              </Typography>
                           </Grid>
                           <Grid item xs={6} md={6}>
                              <Typography variant='subtitle1' sx={memoryfields}>
                                 {currentMemory?.architect}
                              </Typography>
                           </Grid>
                           <Grid item xs={6} md={6}>
                              <Typography variant='subtitle1' sx={memoryfields}>
                                 {currentMemory?.customPrompt}
                              </Typography>
                           </Grid>
                        </Grid>
                        <EditDeleteBtns/>
                     </Box>
               }

            </Box>

         </Modal>
      </>
   );
}

export default SingleMemory;