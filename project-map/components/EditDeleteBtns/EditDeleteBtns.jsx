import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from '@mui/material';
import {deletePlace} from '@/redux/features/SinglePlace/singlePlaceThunks';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, usePathname, useRouter} from 'next/navigation';
import {setIsInEditMode} from '@/redux/features/SinglePlace/singlePlaceSlice';
import {dialogActions, dialogButton, regularButton} from '@/styles/MUIStyleOverrides';
import {enterMemoryEditMode} from '@/redux/features/SingleMemory/memorySlice';
import {deleteMemory, getSingleMemory} from '@/redux/features/SingleMemory/memoryThunks';

function EditDeleteBtns(props) {
   const router = useRouter();
   const dispatch = useDispatch();
   const pathname = usePathname();
   const params = useParams();
   const placeId = params.placeId;
   const {id: userId} = useSelector(state => state.user);

   const [dialogIsOpen, setDialogIsOpen] = useState(false);

   const handleDelete = () => {
      if (pathname.includes('my_memories')) {
         dispatch(deleteMemory({placeId, userId}));
      } else {
         dispatch(deletePlace({placeId}));
      }
      setDialogIsOpen(false);
      router.back();
   };

   const onEditClick = () => {
      if (pathname.includes('my_memories')) {
         dispatch(enterMemoryEditMode(true));
      } else {
         dispatch(setIsInEditMode(true));
      }
   };

   return (
      <div>
         <Stack spacing={1} direction="row" sx={{position: 'absolute', bottom: 40, left: 30, '@media (min-width:300px) and (max-width:800px)': {
            bottom: 20,
            left: 30,
         }}}>
            <Button onClick={onEditClick} variant="outlined" color='button' sx={regularButton}>Edit</Button>
            <Button onClick={() => setDialogIsOpen(true)} variant="outlined" color='button' sx={regularButton}>Delete</Button>
         </Stack>

         <Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
            <DialogTitle sx={{backgroundColor: 'background.primary'}}>Confirm Delete</DialogTitle>
            <DialogContent  sx={{backgroundColor: 'background.primary'}}>
               { pathname.includes('my_memories')
                  ?
                  'Are you sure you want to delete this memory?'
                  :
                  'Are you sure you want to delete this place from the database?'
               }
            </DialogContent>
            <DialogActions sx={dialogActions}>
               <Button onClick={() => setDialogIsOpen(false)} sx={dialogButton} >Cancel</Button>
               <Button onClick={handleDelete}  sx={dialogButton}>Delete</Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}

export default EditDeleteBtns;