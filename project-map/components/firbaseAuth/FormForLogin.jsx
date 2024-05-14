'use client';
import React, {useEffect, useState} from 'react';
import {Box, Button, IconButton, Modal, TextField, Typography} from '@mui/material';
import {focusedField, modalBox, regularButton, signInUpField} from '@/styles/MUIStyleOverrides';
import CloseIcon from '@mui/icons-material/Close';
import {usePathname, useRouter} from 'next/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {setErrorMessage} from '@/redux/features/user/userSlice';

const FormForLogin = ({ title, handleClick }) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [emailError, setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');
   const [submitted, setSubmitted] = useState(false);
   const [userName, setUserName] = useState('');
   const [userNameError, setUserNameError] = useState('');
   
   const router = useRouter();
   const dispatch = useDispatch();
   const user = useSelector(state => state.user);
   const error = useSelector(state => state.user.error);
   const pathname = usePathname();

   useEffect(() => {
      if(error) {
         setTimeout(() => dispatch(setErrorMessage('')), 7000);
      }
   }, [error]);

   useEffect(() => {
      setEmail('');
      setPassword('');
      setUserName('');
   }, [pathname]);

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


   const isValidPassword = (password) => {
      return password.length >= 6 && password.length <= 12;
   };

   const isValidUsername = (username) => {
      return username.length >= 6 && username.length <= 12;
   };

   const handleEmailChange = (e) => {
      setEmail(e.target.value);
      if (submitted) {
         if (!e.target.value.trim()) {
            setEmailError('');
         } else if (!isValidEmail(e.target.value)) {
            setEmailError('Please enter a valid email address.');
         } else {
            setEmailError('');
         }
      }
   };

   const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      if (submitted) {
         if (!e.target.value.trim()) {
            setPasswordError('');
         } else if (!isValidPassword(e.target.value)) {
            setPasswordError('Password must be 6-12 characters long.');
         } else {
            setPasswordError('');
         }
      }
   };

   const handleUserNameChange = (e) => {
      setUserName(e.target.value);
      if(userName) {
         if (submitted) {
            if (!e.target.value.trim()) {
               setUserNameError('');
            } else if (!isValidUsername(e.target.value)) {
               setUserNameError('Username must be 6-12 characters long.');
            } else {
               setUserNameError('');
            }
         }
      }
   };

   const handleButtonClick = () => {
      setSubmitted(true);

      const emailValid = isValidEmail(email);
      const passwordValid = isValidPassword(password);
      const usernameValid = isValidUsername(userName);

      if (!emailValid) {
         setEmailError('Please enter a valid email address.');
      } else {
         setEmailError('');
      }

      if (!passwordValid) {
         setPasswordError('Password must be 6-12 characters long.');
      } else {
         setPasswordError('');
      }

      if (!usernameValid) {
         setUserNameError('Username must be 6-12 characters long.');
      } else {
         setUserNameError('');
      }

      console.log('clicked');

      if(title === 'Sign In') {
         console.log('about to sign');
         if (emailValid && passwordValid) {
            console.log('about to sign in');
            handleClick(email, password);
         }
      } else {
         if (emailValid && passwordValid && usernameValid) {
            console.log('about to sign up');
            handleClick(email, password, userName);
         }
      }
   };

   const handleClose = () => {
      router.push('/');
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
               <Box
                  display='flex'
                  flexDirection='column'
                  // justifyContent='center'
                  align-items='center'
                  sx={{...modalBox,  width: '340px',
                     '@media (min-width:1120px)': {
                        minWidth: '340px',
                        width: '340px'
                     },
                     '@media (max-width:400px)': {
                        minWidth: '200px',
                        width: '200px',
                        height: 'fit-content',
                        maxHeight: '250px'
                     },
                     maxHeight: '340px',
                     minHeight: '280px',
                     height: 'fit-content'
                  }}>
                  
                  <IconButton sx={{position: 'absolute', top: 10, right: 10, color: 'text.primary'}}
                     onClick={handleClose} aria-label="delete" color="black" size='small'>
                     <CloseIcon/>
                  </IconButton>

                  {!user.email ? 
                     <>
                        <Typography
                           alignSelf='center'
                           id="modal-modal-title"
                           variant="h6"
                           component="h2"
                           sx={{
                              color: 'text.primary',
                              display: 'block',
                           }}>
                           {title}
                        </Typography>

                        <TextField
                           label="Email"
                           sx={{
                              ...focusedField,
                              marginTop: '20px',
                              maxHeight: '50px',
                              marginBottom: '30px',}}
                           type='email'
                           required
                           error={!!emailError}
                           helperText={emailError}
                           value={email}
                           onChange={handleEmailChange}

                        />


                        <TextField
                           label="Password"
                           sx={{...focusedField,
                              maxHeight: '50px',
                              marginBottom: '30px',}}
                           type='password'
                           required
                           error={!!passwordError}
                           helperText={passwordError}
                           value={password}
                           onChange={handlePasswordChange}
                        />

                        {title === 'Sign Up' ?
                           <TextField
                              label="Username"
                              sx={{
                                 ...focusedField,
                                 maxHeight: '50px',
                                 marginBottom: '30px',
                              }}
                              type="text"
                              required
                              error={!!userNameError}
                              helperText={userNameError}
                              value={userName}
                              onChange={handleUserNameChange}
                           />
                           :
                           ''
                        }

                        <Button
                           onClick={handleButtonClick}
                           variant="outlined"
                           color='button'
                           size='large'
                           sx={{...regularButton,
                              backgroundColor: 'button.secondary',
                              marginBottom: '30px',
                              '&:hover': {
                                 backgroundColor: 'button.light',
                                 color: 'text.primary'
                              },}}>{title}</Button>

                        {error ?
                           <Typography
                              variant='subtitle1'
                              alignSelf='center'
                              justifyContent='center'
                              sx={{color: 'red',
                                 font: 'inherit',
                                 fontSize: '13px',
                                 fontWeight: 'bold',
                              }}>
                              {error}
                           </Typography>
                           :
                           ''
                        }
                     </>
                     :
                     <Typography
                        variant='subtitle1'
                        alignSelf='center'
                        justifyContent='center'
                        sx={{color: 'red',
                           font: 'inherit',
                           fontSize: '16px',
                        }}>
                        You are currently signed in.
                     </Typography>
                  }

               </Box>
            </>
         </Modal>


      </div>
   );
};

export {FormForLogin};