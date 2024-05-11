'use client';

import React from 'react';
import { Form } from './Form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/user/userSlice';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {useRouter} from 'next/navigation';
import app from '../../firebase/config';


const Register = () => {
   const dispatch = useDispatch();
   const router = useRouter();

   const handleRegister = (email, password) => {
      const auth = getAuth(app);

      createUserWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
            console.log(user);
            dispatch(
               setUser({
                  email: user.email,
                  id: user.uid,
                  token: user.accessToken
               })
            );
            router.push('/');
         })
         .catch(error => {
            console.error('Registration failed:', error.message);
         });
   };

   return (
      <div>
         <Form
            title='Register'
            handleClick={handleRegister}
         />
      </div>
   );
};

export { Register };

