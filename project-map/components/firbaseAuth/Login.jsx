'use client';

import React from 'react';
import { Form } from './Form';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/user/userSlice';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {useRouter} from 'next/navigation';
import {app} from '@/firebase/config';

const Login = () => {
   const dispatch = useDispatch();
   const router = useRouter();
  

   const handleLogin = (email,password) => {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
            // console.log(user, 'loggedin user');
            // dispatch(
            //    setUser({
            //       email: user.email,
            //       id: user.uid,
            //       token: user.accessToken,
            //    })
            // );
            router.push('/');
         })
         .catch(console.error);
   };

   return (
      <Form
         title='sign in'
         handleClick={handleLogin}
      />
   );
};

export { Login };
