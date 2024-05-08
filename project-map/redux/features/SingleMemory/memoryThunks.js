import {createAsyncThunk} from '@reduxjs/toolkit';
import {collection, deleteDoc, doc, onSnapshot, query, setDoc} from 'firebase/firestore';
import {db} from '@/firebase/config';
import {updateToBeVisited, updateVisited} from '@/redux/features/Places/placesSlice';
import {updateAllMemories, updateSingleMemory} from '@/redux/features/SingleMemory/memorySlice';
import {updateStatus} from '@/redux/features/SinglePlace/singlePlaceSlice';

export const getAllMemories = createAsyncThunk(
   'memories/allMemories',
   async ({ userId }, {dispatch}) => {
      const q = query(collection(db, 'users-test', userId, 'my-memories'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
         const list = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
         console.log(list);
         dispatch(updateAllMemories(list));
      });
   }
);


export const getSingleMemory = createAsyncThunk(
   'memories/getSingleMemory',
   async ({placeId, userId}, {dispatch}) => {

      await onSnapshot(doc(db, 'users-test', userId, 'my-memories', placeId), (docSnapshot) => {
         if (docSnapshot.exists()) {
            console.log(docSnapshot.data(), ' check memodata');
            dispatch(updateSingleMemory(docSnapshot.data()));
         } else {
            dispatch(updateSingleMemory({}));
            console.log('set to empty');
         }
      });
   }
);

export const addNewMemory = createAsyncThunk(
   'memories/addNewMemory',
   async ({userId, placeId, memory}, {dispatch}) => {
      const docRef = await setDoc(doc(db, `users-test/${userId}/my-memories`, placeId), {...memory} );
      console.log('added to my memories', docRef);
   }
);

export const deleteMemory = createAsyncThunk(
   'memories/deleteMemory',
   async ({userId, placeId}, {dispatch}) => {
      const deletedRef = await deleteDoc(doc(db, 'users-test', userId, 'my-memories', placeId));
      console.log(` ${deletedRef} deleted from memories`);
   }
);

export const editMemory = createAsyncThunk(
   'memories/editMemory',
   async ({userId, placeId, memory}, {dispatch}) => {
      const docRef = await setDoc(doc(db, `users-test/${userId}/my-memories/${placeId}`), {...memory} );
      console.log('edited memory', docRef);
   }
);