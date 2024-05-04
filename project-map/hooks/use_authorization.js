'use client';

import { useSelector } from 'react-redux';

export function useAuth() {
   const user = useSelector(state => state.user);

   if (!user) {

      return {
         isAuth: false,
         email: '',
         token: '',
         id: ''
      };
   }

   const { email, token, id } = user;

   return {
      isAuth: !!email,
      email,
      token,
      id,
   };
}
