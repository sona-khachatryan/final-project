import {createAsyncThunk} from '@reduxjs/toolkit';
import {collection, doc, setDoc} from 'firebase/firestore';
import {app, db} from '@/firebase/config';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

export const addNewUserDoc = createAsyncThunk(
   'user/addNewUserDoc',
   async ({userId}, {dispatch}) => {
      const docRef = await setDoc(doc(db, 'users', userId), {});
      console.log('new user in collection', docRef);
   }
);


