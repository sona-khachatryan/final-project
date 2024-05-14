'use client';

import React from 'react';
import { FormForLogin } from './FormForLogin';
import { useDispatch } from 'react-redux';
import {removeUser, setUser} from '@/redux/features/user/userSlice';
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import {useRouter} from 'next/navigation';
import {app} from '@/firebase/config';

const Login = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const auth = getAuth(app);


   const handleLogin = (email,password) => {
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
      <FormForLogin
      //TO DO: show an alert saying you are currently logged in same for the sign up page
         title='sign in'
         handleClick={handleLogin}
      />
   );
};

export { Login };
