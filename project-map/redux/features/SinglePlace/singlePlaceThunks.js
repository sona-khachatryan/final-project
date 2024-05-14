import {createAsyncThunk} from '@reduxjs/toolkit';
import {doc, onSnapshot, setDoc, deleteDoc} from 'firebase/firestore';
import {updateSinglePlace, updateStatus} from '@/redux/features/SinglePlace/singlePlaceSlice';
import {db} from '@/firebase/config';


export const getSinglePlace = createAsyncThunk(
   'singlePlace/getSinglePlace',
   async ({placeId}, {dispatch}) => {
      onSnapshot(doc(db, 'places', placeId), (docSnapshot) => {
         if (docSnapshot.exists()) {
            dispatch(updateSinglePlace({id: docSnapshot.id, ...docSnapshot.data()}));
         } else {
            console.log('Document does not exist');
         }
      });
   }
);

export const getStatus = createAsyncThunk(
   'singlePlace/getStatus',
   async ({placeId, userId}, {dispatch}) => {

      onSnapshot(doc(db, 'users', userId, 'visited', placeId), (docSnapshot) => {
         if (docSnapshot.exists()) {
            console.log('visited');
            dispatch(updateStatus('visited'));
         } else {
            onSnapshot(doc(db, 'users', userId, 'toBeVisited', placeId), (docSnapshot) => {
               if (docSnapshot.exists()) {
                  console.log('toBeVisited');
                  dispatch(updateStatus('toBeVisited'));
               } else {
                  dispatch(updateStatus('unvisited'));
               }
            });
         }
      });



   }
);

export const changeStatus = createAsyncThunk(
   'singlePlace/changeStatus',
   async ({userId, thePlace, oldStatus, newStatus}, {dispatch}) => {
      
      //add to the new subcollection or set to 'unvisited'

      if(newStatus !== 'unvisited') {
         const docRef = await setDoc(doc(db, `users/${userId}/${newStatus}`, thePlace.id), {...thePlace} );
         console.log(`added to ${newStatus} `, docRef);
      } else {
         dispatch(updateStatus('unvisited'));
      };

      if(oldStatus !== 'unvisited') {
         //delete from the old subcollection
         const deletedRef = await deleteDoc(doc(db, 'users', userId, oldStatus, thePlace.id));
         console.log(` ${deletedRef} deleted from ${oldStatus}`);
      }
      
   }
);

export const deletePlace = createAsyncThunk(
   'singlePlace/deletePlace',
   async ({placeId}) => {
      await deleteDoc(doc(db, 'places', placeId));
   }
);

export const editPlace = createAsyncThunk(
   'singlePlace/editPlace',
   async ({placeId, updatedPlace}) => {
      await setDoc(doc(db, 'places', placeId), {
         ...updatedPlace
      });
   }
);

