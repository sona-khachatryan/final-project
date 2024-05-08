import React, {useEffect} from 'react';
import {
   Box, CircularProgress,
   FormControl,
   Grid,
   IconButton,
   InputLabel,
   Link as MUILink,
   MenuItem,
   Modal,
   Select,
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
   }, [currentMemory]);

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
                     <EditDeleteBtns/>
               }

            </Box>

         </Modal>
      </>
   );
}

export default SingleMemory;