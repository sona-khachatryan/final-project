'use client';

import { useDispatch } from 'react-redux';
import {setErrorMessage} from '@/redux/features/user/userSlice';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {useRouter} from 'next/navigation';
import {auth} from '@/firebase/config';
import {addNewUserDoc, updateAdditionalUserInfo} from '@/redux/features/user/userThunks';
import {FormForLogin} from '@/components/firbaseAuth/FormForLogin';


const Register = () => {
   const dispatch = useDispatch();
   const router = useRouter();

   const handleRegister = (email, password, userName) => {

      createUserWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
            dispatch(addNewUserDoc({userId: user.uid}));
            dispatch(updateAdditionalUserInfo({user, userName}));
            console.log(user);
            // dispatch(
            //    setUser({
            //       email: user.email,
            //       id: user.uid,
            //       userName: user.displayName,
            //    })
            // );
            router.push('/');
         })
         .catch(error => {
            dispatch(setErrorMessage('This email is linked to an existing account'));
            console.error('Registration failed:', error.message);
         });
   };

   return (
      <div>
         <FormForLogin
            title='Sign Up'
            handleClick={handleRegister}
         />
      </div>
   );
};

export { Register };

