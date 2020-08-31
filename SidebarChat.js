import React, { useEffect ,useState} from 'react';
import "./SidebarChat.css";
import{Avatar} from "@material-ui/core";
import db from './firebase';
import {Link} from "react-router-dom";


function SidebarChat({id,name,addnewChat}) {
    const [seed,setseed]=useState("");
    const [message,setmessage]=useState("");
    useEffect(()=>{
    if(id){
        db.collection('Rooms').doc(id).collection('messages')
        .orderBy('timestamp','desc').
        onSnapshot((snapshot)=>

            setmessage(snapshot.docs.map((doc)=>
            doc.data()))

        );

    }
    },[id]);

    const createChat=()=>{
       const roomName=prompt("Enter your new room name");
       if(roomName)
       {
           db.collection('Rooms').add({
            name:roomName,
           })
       }
    };
    useEffect(()=>{
        setseed(Math.floor(Math.random()*50000));
    },[]);

    return !addnewChat? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarchat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarchat_info">
                    <h2>{name}</h2>
                    <p>{message[0]?.message}</p>            
                </div>
            </div>
        </Link>
        
    ):(
    <div onClick={createChat} className="sidebarchat">
        <div  className="sidebarchat_addRoom">
        <h2>Add new Room</h2>
            </div>
        
    </div>
    );
}

export default SidebarChat
