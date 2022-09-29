import React,{useState} from "react";
import {dbService} from "fbase"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
const Home = ()=>{
    const [jweet,setJweet] = useState("");
    const onSubmit = async(e)=>{
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "Jweets"), {
            jweet,
            createdAt: Date.now(),
        });
        console.log("Document written with ID: ", docRef.id);
        } catch (error) {
        console.error("Error adding document: ", error);
        }
        setJweet("");
       
    }
    const onChange = (e)=>{
        const {target:{value}} = e;
        setJweet(value);
    }
    return(
        <form onSubmit={onSubmit}>
            <input type="text" placehoder="what's on your mind?" maxLength={120} value={jweet} onChange={onChange}/>
            <input type="submit" value="Jweet" />
        </form>
    );
};
export default Home;