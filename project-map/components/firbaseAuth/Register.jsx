'use client';

import React from 'react';
import { Form } from './Form';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/user/userSlice';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {useRouter} from 'next/navigation';
import {app} from '@/firebase/config';
import {addNewUserDoc} from '@/redux/features/user/userThunks';


const Register = () => {
   const dispatch = useDispatch();
   const router = useRouter();

   const handleRegister = (email, password) => {
      const auth = getAuth(app);

      createUserWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
            //console.log(user, 'registered user');
            dispatch(addNewUserDoc({userId: user.uid}));
            // dispatch(
            //    setUser({
            //       email: user.email,
            //       id: user.uid,
            //       token: user.accessToken
            //    })
            // );
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

