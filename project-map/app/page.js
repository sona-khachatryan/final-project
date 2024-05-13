'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import UserModal from '@/components/firbaseAuth/userModalForm';
import { useSelector } from 'react-redux';
import { UserExample } from '@/components/User/page';

export default function Main() {
   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
   const user = useSelector(state => state.user);

   const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
   };

   return (
      <main>
         <div>Welcome to map page</div>
         <button onClick={toggleModal}>Profile</button>
         {isModalOpen && <UserModal user={UserExample} />}
      </main>
   );
}

