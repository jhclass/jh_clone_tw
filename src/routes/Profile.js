import React from "react";
import { getAuth, signOut } from "firebase/auth";
export default ()=> {
    const onLogOutClick=()=> {
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        console.log('로그아웃됨');
        const history = useHistory();
        history.push("/");

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