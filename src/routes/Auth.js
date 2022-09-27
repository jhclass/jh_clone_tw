import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    } from 'firebase/auth';
   
const Auth = ()=> {

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newAccount,setNewAccount] = useState(true);
    const [error,setError] = useState("");
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
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev)=>!prev);

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
            <button>Continue with Google.</button>
            <button>Continue with Github.</button>
        </div>

    </div>
    );
};
export default Auth;