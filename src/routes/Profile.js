import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
export default ()=> {
    const navigate = useNavigate();
    const onLogOutClick=()=> {
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        console.log('로그아웃됨');
        
        navigate("/");

        }).catch((error) => {
        // An error happened. 
        });
    }
    return(
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
}