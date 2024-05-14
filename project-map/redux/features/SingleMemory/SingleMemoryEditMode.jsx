'use client';

import React, {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {editPlace, getSinglePlace} from '@/redux/features/SinglePlace/singlePlaceThunks';
import {
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Grid,
   Stack,
   TextField,
   Typography
} from '@mui/material';
import {dialogButton, focusedField, regularButton} from '@/styles/MUIStyleOverrides';
import {prompts} from '@/constants/prompts';
import {setIsInEditMode} from '@/redux/features/SinglePlace/singlePlaceSlice';
import {enterMemoryEditMode} from '@/redux/features/SingleMemory/memorySlice';
import {addNewMemory, editMemory} from '@/redux/features/SingleMemory/memoryThunks';

const getCurrentDate = () => {
   const currentDate = new Date();
   const month = (currentDate.getMonth() +1).toString().padStart(2,0);
   const dateArr = currentDate.toDateString().split(' ');
   const dateStr = `${dateArr[3]}-${month}-${dateArr[2]}`;
   return dateStr;
};

const promptStyle = {
   color: 'text.primary',
   font: 'inherit',
   fontSize: '13px',
   width: '400px',
   margin: '10px',
   '@media (min-width:300px) and (max-width:800px)': {
      display: 'none',
   },
   '@media (min-width:801px)': {
      display: 'inline-block',
   },
};

const fieldStyle = {
   '& .MuiInputBase-root': {
      width: '400px',
      marginLeft: '10px',
      '@media (min-width:300px) and (max-width:800px)': {
         width: '270px',
         fontSize: '11px',
      },
      '@media (min-width:801px)': {
         // display: 'inline-block',
      },
   },
   ...focusedField,
   overflowY: 'auto',

   // display: { xs: 'none', sm: 'none', md: 'block'},
};
function SingleMemoryEditMode(props) {
   const params = useParams();
   const dispatch = useDispatch();
   const currentMemory = useSelector(state => state.memories.singleMemory);
   const memoryIsInEditMode = useSelector(state => state.memories.memoryEditMode);
   const currentPlace = useSelector(state => state.singlePlace.data);
   const mode = useSelector(state => state.theme.mode);
   const {id: userId} = useSelector(state => state.user);
   const router = useRouter();

   const [currentDate, setCurrentDate] = useState('');
   const [selectedDate, setSelectedDate] = useState('');
   const placeId = params.placeId;

   const [dialogIsOpen, setDialogIsOpen] = useState(false);
   const [reflectInputValue, setReflectInputValue] = useState('');
   const [learnOrHistoryInputValue, setLearnOrHistoryInputValue] = useState('');
   const [archInputValue, setArchInputValue] = useState('');
   const [customPromptInputValue, setCustomPromptInputValue] = useState('');

   const [isSmallScreen, setIsSmallScreen] = useState(false);
   const [textColor, setTextColor] = useState(mode === 'dark' ? '#E9E5DA' : '#482E5B');
   
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

   useEffect(() => {
      dispatch(getSinglePlace({placeId}));
      setCurrentDate(getCurrentDate());
      setSelectedDate(getCurrentDate());
   }, [placeId, dispatch, memoryIsInEditMode]);


   useEffect(() => {
      if(currentMemory?.recorded) {
         setReflectInputValue(currentMemory.reflect);
         setLearnOrHistoryInputValue(currentMemory.learnOrHistory);
         setArchInputValue(currentMemory.architect);
         setCustomPromptInputValue(currentMemory.customPrompt);
         setSelectedDate(currentMemory.visitDate);
      }
   }, [currentMemory]);

   useEffect(() => {
      if(mode === 'dark') {
         setTextColor('#E9E5DA');
      } else {
         setTextColor('#482E5B');
      }
   }, [mode]);

   const handleSave = () => {
      const memory = {
         recorded: true,
         visitDate: selectedDate,
         reflect: reflectInputValue,
         learnOrHistory: learnOrHistoryInputValue,
         architect: archInputValue,
         customPrompt: customPromptInputValue,
         title: currentPlace?.title,
      };

      if(currentMemory.recorded) {
         dispatch(editMemory({placeId, userId, memory}));
      } else {
         dispatch(addNewMemory({placeId, userId, memory}));
      }

      setDialogIsOpen(false);
      dispatch(enterMemoryEditMode(false));


   };

   const handleCancel = () => {
      if(currentMemory?.recorded) {
         dispatch(enterMemoryEditMode(false));
      } else {
         router.back();
      }
   };


   return (
      <>
         <Box sx={{marginLeft: '10px', '@media (min-width:300px) and (max-width:800px)': {
            marginBottom: '10px'
         }}}>
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
               {currentPlace?.title}
            </Typography>
            <Box sx={{marginLeft: '10px', display: 'inline', '@media (min-width:300px) and (max-width:800px)': {
               display: 'block', marginLeft: 0
            },}}>
               <label
                  htmlFor="visitdate"
                  style={{
                     marginRight: '7px',
                     fontSize: '13px',
                     color: `${textColor}`,
                  }}
               >Visited on</label>
               <input
                  id="visitdate"
                  name="visit date"
                  type="date"
                  min="1900-01-01"
                  max={currentDate}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{backgroundColor: '#E9E5DA'}}
               />
            </Box>
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
               <Typography variant='caption' sx={{
                  ...promptStyle
               }}>
                  {currentPlace?.type ? prompts[currentPlace.type][0] : ''}
               </Typography>
               <TextField
                  id="1"
                  multiline
                  rows={isSmallScreen ? 4 : 5}
                  value={reflectInputValue}
                  onChange={(e) => setReflectInputValue(e.target.value)}
                  size='medium'
                  placeholder={(isSmallScreen && currentPlace?.type) ? prompts[currentPlace.type][0].split('.')[0] : ''}
                  sx={{...fieldStyle}}
               />
            </Grid>
            <Grid item xs={6} md={6} sx={{}}>
               <Typography variant='caption' sx={{
                  ...promptStyle
               }}>
                  {currentPlace?.type ? prompts[currentPlace.type][1] : ''}
               </Typography>
               <TextField
                  id="2"
                  multiline
                  rows={isSmallScreen ? 4 : 5}
                  value={learnOrHistoryInputValue}
                  onChange={(e) => setLearnOrHistoryInputValue(e.target.value)}
                  size='medium'
                  placeholder={(isSmallScreen && currentPlace?.type) ? prompts[currentPlace.type][1].split('.')[0] : ''}
                  sx={{...fieldStyle}}
               />
            </Grid>
            <Grid item xs={6} md={6}>
               <Typography variant='caption' sx={{
                  ...promptStyle
               }}>
                  {currentPlace?.type ? prompts[currentPlace.type][2] : ''}
               </Typography>
               <TextField
                  id='3'
                  multiline
                  rows={isSmallScreen ? 4 : 5}
                  value={archInputValue}
                  onChange={(e) => setArchInputValue(e.target.value)}
                  size='medium'
                  placeholder={(isSmallScreen && currentPlace?.type) ? prompts[currentPlace.type][2].split('.')[0] : ''}
                  sx={{...fieldStyle}}
               />
            </Grid>
            <Grid item xs={6} md={6}>
               <Typography variant='caption' sx={{
                  ...promptStyle
               }}>
                  {currentPlace?.type ? prompts[currentPlace.type][3] : ''}
               </Typography>
               <TextField
                  id='4'
                  multiline
                  rows={isSmallScreen ? 4 : 5}
                  value={customPromptInputValue}
                  onChange={(e) => setCustomPromptInputValue(e.target.value)}
                  size='medium'
                  placeholder={(isSmallScreen && currentPlace?.type) ? prompts[currentPlace.type][3].split('.')[0] : ''}
                  sx={{...fieldStyle}}
               />
            </Grid>
         </Grid>
         <Stack spacing={1} direction="row" sx={{ position: 'absolute', bottom: 40, left: 40,   '@media (min-width:300px) and (max-width:800px)': {
            bottom: 20,
            left: 40,
         },}}>
            <Button onClick={handleCancel} variant="outlined" color='button' size={isSmallScreen ? 'small' : 'medium'} sx={regularButton}>Cancel</Button>
            <Button onClick={() => setDialogIsOpen(true)} variant="outlined" color='button' size={isSmallScreen ? 'small' : 'medium'} sx={regularButton}>Save</Button>

         </Stack>
         <Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
            <DialogTitle sx={{backgroundColor: 'background.primary'}}>Confirm Changes</DialogTitle>
            <DialogContent  sx={{backgroundColor: 'background.primary'}}>
               Are you sure you want to make changes?
            </DialogContent>
            <DialogActions sx={{color: 'text.primary', backgroundColor: 'background.primary'}}>
               <Button onClick={() => setDialogIsOpen(false)} sx={dialogButton}>Cancel</Button>
               <Button onClick={handleSave} sx={dialogButton}>Save</Button>
            </DialogActions>
         </Dialog>
      </>
   );
}

export default SingleMemoryEditMode;