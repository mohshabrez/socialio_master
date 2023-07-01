import { UseAuth } from "../../Context/AuthContext";
import "./PopUp.css"
import React, { useState } from 'react';

export function PopUp({onEdit, onDelete, mypost}){
    const {currentUser} = UseAuth()
   

    

    return (
       <>
       {mypost ? (
        <div className="popup">
        <button onClick={onEdit}>Edit</button>
        <div className="vll"></div>
        <button onClick={onDelete}>Delete</button>
      </div>
       ) : (<div className="popupsecond">
       <button onClick={onEdit}>UnFollow</button>
     </div>)}
       </>
        
        
      );
}