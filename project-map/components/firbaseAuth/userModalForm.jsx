'use client';

import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import {app} from '../../firebase/config';
import { useDispatch } from 'react-redux';
import {updateUsername} from '@/redux/features/user/userSlice';

const UserModal = ({ user }) => {
   const [newUsername, setNewUsername] = useState('');
   const [showModal, setShowModal] = useState(false);
   const auth = getAuth(app);
   const dispatch = useDispatch();

   const handleUsernameChange = (e) => {
      setNewUsername(e.target.value);
   };

   const handleLogout = () => {
      signOut(auth);
   };

   const handleChangeUsername = () => {
      dispatch(updateUsername(newUsername));
      setNewUsername('');
   };

   const toggleModal = () => {
      setShowModal(!showModal);
   };

   return (

      <div className="user-modal">
         <div className="user-info">
            <img alt="User" />
            <p className="email">Email: {user.email}</p>
            <p className="username">Username: {user.username}</p>
            <input
               type="text"
               placeholder="Enter new username"
               value={newUsername}
               onChange={handleUsernameChange}
            />
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleChangeUsername}>Change Username</button>
         </div>

      </div>
   );
};

export default UserModal;
