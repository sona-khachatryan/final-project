'use client';

import React from 'react';
import { FormForLogin } from './FormForLogin';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/user/userSlice';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {useRouter} from 'next/navigation';
import app from '../../firebase/config';
import HomePage from '@/app/exampleHomepage/page';

const Login = () => {
   const dispatch = useDispatch();
   const router = useRouter();
  

   const handleLogin = (email,password) => {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
            console.log(user);
            dispatch(
               setUser({
                  email: user.email,
                  id: user.uid,
                  token: user.accessToken,

               })
            );
            router.push('/');
         })
         .catch(console.error);
   };

   return (
      <FormForLogin
         title='sign in'
         handleClick={handleLogin}
      />
   );
};

export { Login };
