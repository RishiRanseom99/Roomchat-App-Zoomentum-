import React, { useState ,useEffect} from 'react'
import  './Chat.css';
import {Avatar,IconButton,Button} from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import {useParams} from "react-router-dom";
import db from './firebase';
import {useStateValue} from './StateProvider';
import firebase from 'firebase';


function Chat() {

    const [input,setinput]=useState("");
    const {roomId}=useParams();
    const [roomname,setRoomname]=useState("");
    const [messages,setmessages]=useState([]);
    const [{ user },dispatch]=useStateValue();
    useEffect(() => {
        if(roomId)
        {
            db.collection('Rooms')
            .doc(roomId)
            .onSnapshot((snapshot)=>setRoomname
            (snapshot.data().name));

            db.collection('Rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp','asc')
            .onSnapshot((snapshot)=>
            setmessages(snapshot.docs.map((doc)=>
            doc.data()))
                );
            console.log(messages);
        }
    }, [roomId])

    const sendMessage=(e)=>{
        e.preventDefault();
        // console.log(input);
        db.collection('Rooms').doc(roomId).collection('messages')
        .add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setinput("");
    };
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                    <h2>{roomname}</h2>
                    <p>
                        last seen{" "}
                        {
                            new Date(messages[messages.length-1]?.timestamp?.toDate
                                ()).toUTCString()
                        }
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton><SearchOutlined/></IconButton>
                    <IconButton><AttachFile/></IconButton>
                    <IconButton><MoreVert/></IconButton>
                </div>
            </div>
            <div className="chat__body">
                {
                    
                    messages.map((message)=>(
                    <p className={`chat__message ${message.name ===user.displayName
                     && "chat__receiver"}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">
                        {
                            new Date(message.timestamp?.toDate
                            ()).toUTCString()
                        }
                        </span>
                     </p>
                   

                ))
                }
               
            </div>
            <div className="chat__footer">
                <IconButton><InsertEmoticonIcon/></IconButton>
                <form>
                  <input type="text" value={input} onChange={(e)=>setinput(e.target.value)}   placeholder="Enter your message"/>
                  <Button  type="submit" onClick={sendMessage}>Send</Button>

                </form>

                <IconButton><MicIcon/></IconButton>

            </div>

        </div>
    )
}

export default Chat
