'use client';

import React, {useEffect, useState} from 'react';
import {
   Box,
   Button,
   IconButton,
   Modal, Stack, TextField,
   Typography
} from '@mui/material';
import {focusedField, modalBox, regularButton} from '@/styles/MUIStyleOverrides';
import CloseIcon from '@mui/icons-material/Close';
import {useRouter} from 'next/navigation';
import {signOut} from 'firebase/auth';
import {addAdminRole, auth} from '@/firebase/config';
import {useDispatch, useSelector} from 'react-redux';
import {getSpecificPlaceList} from '@/redux/features/Places/placesThunks';
import {updateAdditionalUserInfo} from '@/redux/features/user/userThunks';


function UserProfile(props) {
   const router = useRouter();
   const dispatch = useDispatch();
   const {visited, toBeVisited} = useSelector(state => state.places);
   const {id: userId, email, userName, isAdmin} = useSelector(state => state.user);

   const [editMode, setEditMode] = useState(false);
   const [userNameInputValue, setUserNameInputValue] = useState(userName);
   const [userNameError, setUserNameError] = useState('');

   const [emailInputValue, setEmailInputValue] = useState('');
   const [emailError, setEmailError] = useState('');
   const [openAdminInput, setOpenAminInput] = useState(false);
   const [appointMessage, setAppointMessage] = useState('');

   useEffect(() => {
      if(userId) {
         dispatch(getSpecificPlaceList({visitStatus: 'visited', userId}));
         dispatch(getSpecificPlaceList({visitStatus: 'toBeVisited', userId}));
      }
   }, [dispatch, userId]);

   useEffect(() => {
      let timeoutId;
      if(appointMessage) {
         timeoutId = setTimeout(() => setAppointMessage(''), 5000);
      }

      return () => {
         clearTimeout(timeoutId);
      };
   }, [appointMessage]);

   useEffect(() => {

      const isValidUsername = (username) => {
         return username.length >= 6 && username.length <= 12;
      };

      const isValidEmail = (email) => {
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

         const allowedEmailDomains = [
            'gmail.com',
            'yahoo.com',
            'hotmail.com',
            'outlook.com',
            'aol.com',
            'icloud.com',
            'mail.com',
            'yandex.com',
            'mail.ru',
         ];

         return emailRegex.test(email) && allowedEmailDomains.some(domain => email.endsWith(domain));
      };

      setUserNameError('');
      setEmailError('');

      if (!userNameInputValue || !isValidUsername(userNameInputValue)) {
         setUserNameError('Username must be 6-12 characters long.');
      }

      if (!emailInputValue || !isValidEmail(emailInputValue)) {
         setEmailError('Please enter a valid email address.');
      }

   }, [userNameInputValue, emailInputValue]);

   useEffect(() => {
      if(userNameError) {
         setSaveIsDisabled(true);
      } else {
         setSaveIsDisabled(false);
      }
   }, [userNameError]);


   const [saveIsDisabled, setSaveIsDisabled] = useState(false);

   
   const handleManageAccountClick = () => {
      setEditMode(true); 
   };
   
   const handleSave = () => {
      dispatch(updateAdditionalUserInfo({user: auth.currentUser, userName: userNameInputValue}));
      setEditMode(false);
   };



   const handleCancelAppoint = () => {
      setEmailInputValue('');
      setEmailError('');
      setOpenAminInput(false);
   };

   const handleAppoint = () => {
      addAdminRole({email: emailInputValue}).then(result => {
         console.log(result, 'new admin');
         if(result.data?.errorInfo) {
            setAppointMessage(result.data?.errorInfo?.message);
            setEmailInputValue('');
         } else if(result?.data?.message) {
            setAppointMessage(result?.data?.message);
            setEmailInputValue('');
         }
      });
   };

   const handleEditModeCancel = () => {
      setUserNameInputValue('');
      setUserNameError('');
      setEditMode(false);
   };

   const handleClose = () => {
      handleEditModeCancel();
      handleCancelAppoint();
      router.push('/');
   };

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
               <Box sx={{...modalBox,  minWidth: '340px', width: '30vw',  '@media (min-width:1120px)': {
                  minWidth: '340px', width: '30vw'
               },}}>
                  <IconButton sx={{position: 'absolute', top: 10, right: 10, color: 'text.primary'}} onClick={handleClose} aria-label="delete" color="black" size='small'>
                     <CloseIcon/>
                  </IconButton>

                  {editMode ?
                     <TextField
                        id="outlined-multiline-static"
                        label="Username"
                        sx={{...focusedField, display: 'block', margin: '10px 0'}}
                        required
                        error={!!userNameError}
                        helperText={userNameError}
                        value={userNameInputValue}
                        onChange={(e) => setUserNameInputValue(e.target.value)}
                     />
                     :
                     <Typography variant='subtitle1'  sx={{
                        color: 'text.primary',
                        display: 'inline-block',
                        font: 'inherit',
                     }}>
                        Username: {userName}
                     </Typography>
                  }
                  <Typography variant='subtitle1'  sx={{
                     color: 'text.primary',
                     display: 'block',
                     font: 'inherit',
                  }}>
                     Email: {email}
                  </Typography>

                  <Typography 
                     variant='subtitle1'
                     onClick={() => router.push(`/${userName}/my_places`)}
                     sx={{
                        color: 'text.primary',
                        display: 'inline-block',
                        font: 'inherit',
                        textDecoration: 'none',
                        marginTop: '20px',
                        // transition: 'text-decoration 0.3s ease',
                        '&:hover': {
                           textDecoration: 'underline',
                           cursor: 'pointer',
                        }
                     }}>
                     Visited <strong>{visited?.length}</strong>
                     <br/>
                     To Be Visited <strong>{toBeVisited?.length}</strong>
                  </Typography>

                  {/*add new place*/}
                  
                  {isAdmin ?
                     <>
                        <Typography id="modal-modal-title"
                           variant="h6"
                           component="h2"
                           sx={{
                              color: 'text.primary',
                              display: 'block',
                              fontSize: '14px',
                              marginTop: '20px',
                           }}>
                           Admin Dashboard
                        </Typography>

                        <Typography variant='subtitle1' onClick={() =>  router.push('/new_place')} sx={{
                           color: 'text.primary',
                           display: 'inline-block',
                           font: 'inherit',
                           textDecoration: 'none',
                           // transition: 'text-decoration 0.3s ease',
                           '&:hover': {
                              textDecoration: 'underline',
                              cursor: 'pointer'
                           },}}>
                           Add a new place
                        </Typography>

                        <Typography variant='subtitle1' onClick={() =>  setOpenAminInput(true)} sx={{
                           color: 'text.primary',
                           display: 'block',
                           font: 'inherit',
                           textDecoration: 'none',
                           // transition: 'text-decoration 0.3s ease',
                           '&:hover': {
                              textDecoration: 'underline',
                              cursor: 'pointer'
                           },}}>
                           Appoint new admin
                        </Typography>

                        {
                           openAdminInput ?
                              <TextField
                                 id="outlined-multiline-static"
                                 label="Email"
                                 sx={{...focusedField, display: 'block', margin: '10px 0'}}
                                 required
                                 error={!!emailError}
                                 helperText={emailError}
                                 value={emailInputValue}
                                 onChange={(e) => setEmailInputValue(e.target.value)}
                              />
                              :
                              ''
                        }

                        {
                           appointMessage ?
                              <Typography
                                 variant='subtitle1'
                                 alignSelf='center'
                                 justifyContent='center'
                                 sx={{
                                    display: 'inline-block',
                                    color: 'red',
                                    font: 'inherit',
                                    fontSize: '16px',
                                    padding: '5px',
                                    backgroundColor: 'button.text'
                                 }}>
                                 {appointMessage}
                              </Typography>
                              :
                              ''
                        }
                     </>
                     :
                     ''
                  }
                     
                  {/*appoint new admin*/}

                  <Stack spacing={1} direction="column" sx={{position: 'absolute', bottom: 40, left: 30, '@media (min-width:300px) and (max-width:800px)': {
                     bottom: 20,
                     left: 30,
                  }}}>
                     {openAdminInput ?
                        <>
                           <Button onClick={handleAppoint} disabled={saveIsDisabled} variant="outlined" color='button' sx={regularButton}>Appoint</Button>
                           <Button onClick={handleCancelAppoint} variant="outlined" color='button' sx={regularButton}>Cancel</Button>
                        </>
                        :
                        ''
                     }
                     {
                        editMode
                           ?
                           <>
                              <Button onClick={handleSave} disabled={saveIsDisabled} variant="outlined" color='button' sx={regularButton}>Save</Button>
                              <Button onClick={handleEditModeCancel} variant="outlined" color='button' sx={regularButton}>Cancel</Button>
                           </>
                           :
                           <Button onClick={handleManageAccountClick} variant="outlined" color='button' sx={regularButton}>Manage Account</Button>

                     }
                     <Button onClick={handleLogout} disabled={editMode} variant="outlined" color='button' sx={regularButton}>Sign Out</Button>
                  </Stack>
                  

               </Box>
            </>
         </Modal>
      </div>
   );
}

export default UserProfile;