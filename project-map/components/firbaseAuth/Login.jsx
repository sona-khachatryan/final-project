'use client';

import { FormForLogin } from './FormForLogin';
import { useDispatch } from 'react-redux';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useRouter} from 'next/navigation';
import {auth} from '@/firebase/config';
import {setErrorMessage} from '@/redux/features/user/userSlice';


const Login = () => {
   const dispatch = useDispatch();
   const router = useRouter();

   const handleLogin = (email,password) => {
      signInWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
            dispatch(setErrorMessage(''));
            router.push('/');
         })
         .catch(err => {
            console.log(err);
            dispatch(setErrorMessage('Invalid credentials'));
         });
   };

   return (
      <FormForLogin
         title='Sign In'
         handleClick={handleLogin}
      />
   );
};

export { Login };
