import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser,removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
import { toggleGptSearchView } from '../utils/GptSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';
const Header = () => {
  const navigate=useNavigate();
 const dispatch=useDispatch();
  const user=useSelector(store=>store.user);
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch)
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    }); 
  };
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName,photoURL}= user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:{photoURL}}));
        // ...
       navigate("/browse");
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });
    return ()=>unsubscribe();
   },[]);
   const handleGptSearchClick=()=>{
    //toggle GPT Search button()
      dispatch(toggleGptSearchView());
   }
      const handleLanguageChange=(e)=>{
        dispatch(changeLanguage(e.target.value));  
      }
  return (
    <div className="absolute w-full px-5 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img
        className=" w-44 "
         src={LOGO}
        alt="logo"
        />
       {user && <div className="flex p-2">
       {showGptSearch &&(
       <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
        {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>))}
        </select>
       )}
        <button className="py-4 px-4 m-2 bg-purple-800 text-white rounded-lg" onClick={handleGptSearchClick}>{showGptSearch?"Homepage":"GptSearch"}</button>
            <button onClick={handleSignOut} className="bg font-bold text-black bg-white rounded-md px-4 py-4 m-2">Sign Out</button>
        </div>
}
    </div>
  )
}
export default Header