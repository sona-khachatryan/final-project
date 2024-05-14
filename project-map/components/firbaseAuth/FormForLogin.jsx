'use client';
import  React, { useState } from 'react';

const FormForLogin = ({ title, handleClick }) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [emailError, setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');
   const [submitted, setSubmitted] = useState(false);


   const isValidEmail = (email) => {
      const gmailRegex = /^[^\s@]+@gmail\.com$/i;
      return gmailRegex.test(email);
   };

   const isValidPassword = (password) => {
      return password.length >= 6;
   };

   const handleEmailChange = (e) => {
      setEmail(e.target.value);
      if (submitted) {
         if (!e.target.value.trim()) {
            setEmailError('');
         } else if (!isValidEmail(e.target.value)) {
            setEmailError('Please enter a valid Gmail address.');
         } else {
            setEmailError('');
         }
      }
   };

   const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      if (submitted) {
         if (!e.target.value.trim()) {
            setPasswordError('');
         } else if (!isValidPassword(e.target.value)) {
            setPasswordError('Password must be at least 6 characters long.');
         } else {
            setPasswordError('');
         }
      }
   };

   const handleButtonClick = () => {
      setSubmitted(true);

      const emailValid = isValidEmail(email);
      const passwordValid = isValidPassword(password);

      if (!emailValid) {
         setEmailError('Please enter a valid Gmail address.');
      } else {
         setEmailError('');
      }

      if (!passwordValid) {
         setPasswordError('Password must be at least 6 characters long.');
      } else {
         setPasswordError('');
      }

      if (emailValid && passwordValid) {
         handleClick(email, password);
      }
   };

   return (
      <div>
         <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
         />
         {submitted && emailError && <p style={{ color: 'red' }}>{emailError}</p>}
         <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
         />
         {submitted && passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

         <button onClick={handleButtonClick}>
            {title}
         </button>
      </div>
   );
};

export { FormForLogin };