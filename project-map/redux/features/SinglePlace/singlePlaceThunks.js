import {createAsyncThunk} from '@reduxjs/toolkit';
import { doc, onSnapshot } from 'firebase/firestore';
import {updateSinglePlace} from '@/redux/features/SinglePlace/singlePlaceSlice';
import {db} from '@/firebase/config';

export const getSinglePlace = createAsyncThunk(
   'singlePlace/getSinglePlace',
   async ({placeId}, {dispatch}) => {
      const unsubscribe = onSnapshot(doc(db, 'places', placeId), (docSnapshot) => {
         if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            console.log(data);
            dispatch(updateSinglePlace(data));
         } else {
            console.log('Document does not exist');
         }
      });
   }
);

