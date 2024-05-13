'use client';

import React from 'react';
import {
   Box,
   Button,
   Card,
   CardContent,
   CardMedia,
   CircularProgress,
   Grid,
   IconButton,
   Link as MUILink,
   Modal,
   Typography
} from '@mui/material';
import {modalBox} from '@/styles/MUIStyleOverrides';
import CloseIcon from '@mui/icons-material/Close';
import PaginationComponent from '@/redux/features/Pagination/PaginationComponent';
import {useRouter} from 'next/navigation';
import {signOut} from 'firebase/auth';
import {auth} from '@/firebase/config';
import {useSelector} from 'react-redux';
import Link from 'next/link';

function UserProfile(props) {
   const router = useRouter();
   const user = useSelector(state => state.user);
   const handleClose = () => {
      router.push('/');
   };

   // addAdminRole({email: user.email}).then(result => {
   //    console.log(result, 'adminadded');
   // });

   const handleLogout = () => {
      signOut(auth).then(() => {
         console.log('the user signed out');
         handleClose();
      });
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

                  {/*add new place*/}
                  <>
                     {user.isAdmin ?

                        <Typography variant='subtitle1' onClick={() =>  router.push('/new_place')} sx={{
                           color: 'text.primary',
                           display: 'inline-block',
                           font: 'inherit',
                           textDecoration: 'none',
                           // transition: 'text-decoration 0.3s ease',
                           '&:hover': {
                              textDecoration: 'underline',
                           },}}>
                           Add a new place
                        </Typography>
                        :
                        ''
                     }
                  </>
                  {/*appoint new admin*/}
                  <Button onClick={handleLogout}>Log Out</Button>

               </Box>
            </>
         </Modal>
      </div>
   );
}

export default UserProfile;