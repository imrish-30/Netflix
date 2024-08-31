import React from 'react'
import Header from './Header'
import { useState,useRef } from 'react';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword ,updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';

import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL } from '../utils/constants';
const Login = () => {
    const [isSignInForm,setIsSignForm]=useState(true);
    const [errorMessage,setErrorMessage]=useState(null);
    const dispatch=useDispatch()
   
    const email=useRef(null);
    const password=useRef(null);

    const handleButtonClick=(e)=>{
        e.preventDefault();
     const Message=checkValidData(email.current.value,password.current.value);
      setErrorMessage(Message);
      if(Message) return;
    // signup/sign in
    if(!isSignInForm){
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: "name.current.value",
        }).then(() => {
          // Profile updated!
          // ...
          const {uid,email,displayName}= auth.currentUser;
          dispatch(addUser({uid:uid,email:email,displayName:displayName}));
        }).catch((error) => {
          // An error occurred
          // ...
          setErrorMessage(error.message);
        });
        console.log(user);
        // ...
       
      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+" "+errorMessage);
        // ..
      });
    }
    else{
     // sign in logic
     signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
  });
    }
    };
    const toggleSignInForm=()=>{
    setIsSignForm(!isSignInForm);
    };

  return (
    <div>
        <Header/>
        <div className="absolute h-100vh aspect-video">
            <img className="w-full"src={BG_URL}
            alt="logo"
            />
        </div>

        <form onSubmit={(e)=>e.preventDefault()}
        className="w-3/12 absolute p-5 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg">
            <h1 className="font-text-bold-3xl py-2">{isSignInForm?"Sign In":"Sign Up"}</h1>
           {!isSignInForm && <input type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700"/>}
            <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700"/>
            <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700"/>
            <p className="text-red-600">{errorMessage}</p>
            <button className="p-4 my-6 bg-green-800 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm?"Sign In":"Sign Up"}</button>
            <p className="py-4 cursor-pointer" onClick={toggleSignInForm} >{isSignInForm?"New to NetFlix? Sign Up Now":"Already Registered? Sign In"}</p>
        </form>
    </div>
  )
}
export default Login