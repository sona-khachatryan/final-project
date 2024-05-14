import {createAsyncThunk} from '@reduxjs/toolkit';
import {collection, doc, setDoc} from 'firebase/firestore';
import {app, db} from '@/firebase/config';
import {getAuth, onAuthStateChanged, updateProfile} from 'firebase/auth';

export const addNewUserDoc = createAsyncThunk(
   'user/addNewUserDoc',
   async ({userId}, {dispatch}) => {
      const docRef = await setDoc(doc(db, 'users', userId), {});
      console.log('new user in collection', docRef);
   }
);

export const updateAdditionalUserInfo = createAsyncThunk(
   'user/updateAdditionalUserInfo',
   async ({user, userName, photoUrl=''}, {dispatch}) => {
      updateProfile(user, {
         displayName: userName,
         photoURL: photoUrl,
      }).then(() => {
         console.log('Profile updated successfully');
      }).catch((error) => {
         console.log('Profile update failed:', error.message);
      });
   }
);

//updateUserProfile

