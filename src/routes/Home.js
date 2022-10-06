import React,{useState,useEffect} from "react";
import {dbService} from "fbase"
import { addDoc, collection, doc, updateDoc, query, getDocs, onSnapshot, orderBy } from "firebase/firestore";
const Home = ({userObj})=>{
    console.log(userObj);
    const [jweet,setJweet] = useState("");
    const [jweets,setJweets] = useState([]);
    const getJweets = async ()=> {
    try{
        const q = await query(collection(dbService,"Jweets"));
        const qSnapshot = await getDocs(q);
        //console.log(qSnapshot);
        qSnapshot.forEach((doc)=>{
            //console.log(doc.data());
            const jweetObject={
                ...doc.data(),
                id:doc.id,
        
            }
            setJweets((prev)=>[jweetObject, ...prev]);
            
        });
       
 
    }catch(err){
        console.log('에러',err);
    }
        
    };
    useEffect(() => {
        console.log('asdfasdf',jweets);
        const q = query(
        collection(dbService, "Jweets"),
        orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
        const jweetArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
        }));
        setJweets(jweetArr);
        });
    }, []);
        
    const onSubmit = async(e)=>{
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "Jweets"), {
            text:jweet,
            createdAt: Date.now(),
            createId:userObj.uid,
            });
        console.log("Document written with ID: ", docRef.id);
        alert('등록완료되었습니다:)');
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
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="what's on your mind?" maxLength={120} value={jweet} onChange={onChange}/>
                <input type="submit" value="Jweet" />
            </form>
            <div>
             
                {
                   jweets.map((el)=>
                   //console.log('응[ㄱ',el); 출력됨
                   //와 map() 메서드는 한줄만 쓸떈 중괄호 쓰면 안나온다. 대박 짜증난다.
                   <h4>{el.text}</h4>
                   )
                 
                
                }
                
                {console.log('으악',jweets)}
            



            </div>
        </>
    );
};
export default Home;