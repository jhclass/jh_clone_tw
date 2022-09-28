import React, { useState } from "react";

import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    FacebookAuthProvider,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithRedirect,
    signInWithPopup
    } from 'firebase/auth';
    const provider = new GoogleAuthProvider(); 
    const provider_git = new GithubAuthProvider();
const Auth = ()=> {

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newAccount,setNewAccount] = useState(false);
    const [error,setError] = useState("");
    const onChange = (event) => {
        const {target:{name,value}}=event;
       
    }
    const onSubmit = async (e) => {
    e.preventDefault();
        try {
            let data;
            const auth = getAuth();
        if (newAccount) {
            data = await createUserWithEmailAndPassword(auth, email, password);
            alert('회원가입이 완료되었습니다.');
        } else {
            data = await signInWithEmailAndPassword(auth, email, password);
            alert('로그인되었습니다.');
        }
            console.log(data);
           

        } catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev)=>!prev);
    //sns Log-in
    const onSocialClick = (e) => {
        console.log(e.target.name);
        const {target:{name}} = e;
       
        if(name==="google"){
            
            provider.setCustomParameters({
                'display': 'popup'
              });

            const auth = getAuth();
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
        }else if(name==="github"){
            const auth2 = getAuth();
            signInWithPopup(auth2, provider_git)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
                // ...
            });

        }
    }

    return(
    <div>
        {/*토글버튼*/}
        <span onClick={toggleAccount} style={{cursor:"pointer",textDecoration:"underline"}}>{newAccount ? "Log in" : "Create Account"}</span><br/><br/>
        <form onSubmit={onSubmit}>
            <input 
                name="email" 
                type="email" 
                placeholder="Email" 
                required 
                value={email} 
                onChange={onChange}/>
            <br/>
            <input 
                name="password" 
                type="password" 
                placeholder="Password" 
                required 
                value={password} 
                onChange={onChange}/>
                <br/><span>{error}</span><br/>
            <input type="submit" value={newAccount?"Create Account":"Log In"} />
            <br/><br/>
        </form>
        <div>
            <button name="google" onClick={onSocialClick}>Continue with Google.</button>
            <button name="github" onClick={onSocialClick}>Continue with Github.</button>
        </div>

    </div>
    );
};
export default Auth;