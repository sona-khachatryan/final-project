import {createAsyncThunk} from '@reduxjs/toolkit';
import { collection, query, onSnapshot } from 'firebase/firestore';
import {db} from '@/firebase/config';
import {updateAllPlaces, updateToBeVisited, updateVisited} from '@/redux/features/Places/placesSlice';

export const getAllPlaces = createAsyncThunk(
   'places/getAllPlaces',
   async (payload, {dispatch}) => {
      const q = query(collection(db, 'places'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
         const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         console.log(data, 'data');
         dispatch(updateAllPlaces(data));
      });
   }
);

export const getSpecificPlaceList = createAsyncThunk(
   'places/getSpecificPlaceList',
   async ({ userId, visitStatus }, {dispatch}) => {
      const q = query(collection(db, 'users', userId, visitStatus));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
         const list = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
         console.log(list, visitStatus);

         if(visitStatus === 'visited') {
            dispatch(updateVisited(list));
         } else if(visitStatus === 'toBeVisited') {
            dispatch(updateToBeVisited(list));
         }
      });
   }
);

