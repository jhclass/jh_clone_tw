import React, {useState} from "react";
import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Navigation from "./Navigation";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";


 const AppRouter = ({isLoggedIn})=> {
    
    return(
       <BrowserRouter>
            {isLoggedIn && <Navigation/>}
        <Routes>
                {isLoggedIn?
                (
               <>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/profile" element={<Profile />}></Route>
               </>
                )
                :           
                (<Route path="/" element={<Auth />}></Route>)}
        </Routes>
       </BrowserRouter>
    );
}
export default AppRouter;