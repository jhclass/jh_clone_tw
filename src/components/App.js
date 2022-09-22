import React,{useState} from 'react';
import 'App.css';
import AppRouter from 'components/Router';
import {fbase,firebaseAuth} from 'fbase';


function App() {
  console.log(firebaseAuth.currentUser,'현재 user');
  const [isLoggedIn, setIsLoggedIn] = useState(firebaseAuth.currentUser);
  return (
    <>
    <AppRouter isLoggedIn={isLoggedIn}/>
    <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
