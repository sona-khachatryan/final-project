'use client';

import React, {useEffect} from 'react';
import {Box, Button, IconButton, Link as MUILink, Modal} from '@mui/material';
import {modalBox} from '@/styles/MUIStyleOverrides';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import {setIsInEditMode} from '@/redux/features/SinglePlace/singlePlaceSlice';
import {useRouter} from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {setIsInAddNewPlaceMode} from '@/redux/features/Places/placesSlice';
import SingleMemoryEditMode from '@/redux/features/SingleMemory/SingleMemoryEditMode';
import SinglePlaceEditMode from '@/redux/features/SinglePlace/SinglePlaceEditMode';

function NewPlaceForm(props) {
   const router = useRouter();
   const dispatch = useDispatch();
   const addNewPlaceMode = useSelector(state => state.places.isInAddNewPlaceMode);

   useEffect(() => {
      dispatch(setIsInAddNewPlaceMode(true));
   }, []);

   const handleClose = () => {
      dispatch(setIsInAddNewPlaceMode(false));
      router.back();
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

                  { addNewPlaceMode ? <SinglePlaceEditMode/> : ''}

               </Box>
            </>
         </Modal>
      </div>
   );
}

export default NewPlaceForm;