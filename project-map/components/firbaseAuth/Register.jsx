'use client';

import React from 'react';
import {FormForRegister} from '@/components/firbaseAuth/FormForRegister';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/user/userSlice';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Import updateProfile function
import { useRouter } from 'next/navigation';
import app from '../../firebase/config'; // Import your Firebase app configuration

const Register = () => {
   const dispatch = useDispatch();
   const router = useRouter();

   const handleRegister = (email, password, userName) => {
      const auth = getAuth(app);

      createUserWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
            console.log(user);


            updateProfile(user, {
               displayName: userName,
               photoURL: null
            }).then(() => {
               console.log('Profile updated successfully');
            }).catch((error) => {
               console.error('Profile update failed:', error.message);
            });

            dispatch(
               setUser({
                  email: user.email,
                  id: user.uid,
                  token: user.accessToken
               })
            );
            console.log(user);
            router.push('/');
         })
         .catch(error => {
            console.error('Registration failed:', error.message);
         });
   };

   return (
      <div>
         <FormForRegister
            title='Register'
            handleClick={handleRegister}
         />
      </div>
   );
};

export { Register };