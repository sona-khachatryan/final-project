'use client';
import {redirect} from 'next/navigation';
import Link from 'next/link';
import {Login} from '../../components/firbaseAuth/Login';


const SignIn = () => {
   return (
      <div>
         <p>Here is the sign in page</p>
         <Login/>
      </div>
   );
};

export default SignIn;