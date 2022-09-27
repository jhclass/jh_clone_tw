import React,{useEffect, useState} from 'react';
import 'App.css';
import AppRouter from 'components/Router';
import {fbase,firebaseAuth} from 'fbase';


function App() {
  console.log(firebaseAuth.currentUser,'현재 user');
  const [init,setInit] = useState(false); 
  //setInterval(()=>{console.log(firebaseAuth.currentUser,'현재 user');},2000);
  const [isLoggedIn, setIsLoggedIn] = useState(firebaseAuth.currentUser);
  useEffect(()=>{
    firebaseAuth.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]);
  return (
    <>
    {init?<AppRouter isLoggedIn={isLoggedIn}/>:"로그인중입니다.."}
    <footer>&copy; Jwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
