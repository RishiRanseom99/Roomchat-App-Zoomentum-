import React, {useState, useEffect } from 'react';
import "./Sidebar.css";
import SidebarChat from  "./SidebarChat.js";
import {Avatar,IconButton} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import {SearchOutlined} from "@material-ui/icons";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import db from './firebase';
import {useStateValue} from './StateProvider';

function Sidebar() {
    const [rooms,setrooms]=useState([]);
    const [{ user },dispatch]=useStateValue();

    useEffect(()=>{
        db.collection('Rooms').onSnapshot(snapshot=>(

            setrooms(snapshot.docs.map(doc=>({
               id:doc.id,
               data:doc.data()
       
            })))
           ));
    },[]);

    return (
        <div>
            <div className="sidebar">
                <div className="sidebar__header">
                 <Avatar src={user?.photoURL}/>
                 <div  className="sidebar__headerRight">
                    
                    <IconButton><DonutLargeIcon /></IconButton>
                    <IconButton><ChatIcon /></IconButton> 
                    <IconButton><MoreVertIcon /></IconButton>
                 </div>
                </div>
                <div className="sidebar__search">
                    <div className="sidebar__searchContainer">
                        <SearchOutlined/>
                        <input type="text" placeholder="Search or start new chat"/>
                    </div>
                </div>
                <div className="sidebar__chat">
                    <SidebarChat addnewChat/>
                    
                    {
                        rooms.map(room=>(
                            <SidebarChat  key={room.id} id={room.id} name={room.data.name}/>

                        ))
                    }
                    

                    
                    
                    
                </div>

             </div>
        </div>
    )
}

export default Sidebar
