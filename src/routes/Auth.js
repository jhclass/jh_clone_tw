import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    } from 'firebase/auth';
   
const Auth = ()=> {
    
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newAccount,setNewAccount] = useState(false);
    const onChange = (event) => {
        const {target:{name,value}}=event;
        if(name==="email"){
            setEmail(value)
        }else if(name==="password"){
            setPassword(value)
        }
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
            console.log(error);
        }
    };
    return(
    <div>
        <form onSubmit={onSubmit}>
            <input 
                name="email" 
                type="email" 
                placeholder="Email" 
                required 
                value={email} 
                onChange={onChange}/>
            <input 
                name="password" 
                type="password" 
                placeholder="Password" 
                required 
                value={password} 
                onChange={onChange}/>
            <input type="submit" value={newAccount?"Create Account":"Log In"} />
        </form>
        <div>
            <button>Continue with Google.</button>
            <button>Continue with Github.</button>
        </div>

    </div>
    );
};
export default Auth;