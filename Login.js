import React from 'react'
import './Login.css';
import {Button} from '@material-ui/core';
import {auth,provider} from './firebase';
import { actionTypes } from './reducer';
import {useStateValue} from './StateProvider';
function Login() {
    const [{},dispatch]=useStateValue();
    const signIn=()=>{
    auth.signInWithPopup(provider).then((result)=>
         {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
         }).catch((error)=>(alert(error.message)));
    };
    return (
        <div className="login">
            
            <div className="login__body">
                <div className="login__container">
                <h1>Room Chat App</h1>
                <h2>For Zoomentum</h2>
                
                <Button onClick={signIn}>Sign in with google</Button>
                </div>
                
            </div>
            
        </div>
    )
}

export default Login
