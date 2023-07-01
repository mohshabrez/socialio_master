import React, { useReducer, useState } from "react";
import { createContext, useContext, useEffect} from "react";
import { MediaReducer } from "../Reducer/MediaReducer";
import { ACTIONS } from "../Reducer/MediaReducer";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { UseAuth } from "./AuthContext";


const MediaContext = createContext(null)
const dispatchContext = createContext(null)



export function MediaProvider({children}){
    const[posts, setPosts] = useState([])
    const[stories, setStories] = useState([])
    


    useEffect(() => {
        const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
            setPosts(snapshot.docs.map(doc=> ({id: doc.id, data: doc.data()})))
          });
          const unSubu = onSnapshot(collection(db, "users"), (snapshot) => {
            setStories(snapshot.docs.map(doc=> ({id: doc.id, data: doc.data()})))
          });
    },[])
    
    
    

    const initialState={
        PostsData: []
    }

    const[state, dispatch] = useReducer(MediaReducer, initialState)
    return(
        <MediaContext.Provider value={{posts, state, stories}}>
            <dispatchContext.Provider value={dispatch}>
                {children}
            </dispatchContext.Provider>
        </MediaContext.Provider>
    )
}

export const UseMedia = () => useContext(MediaContext);
export const UseDispatch = () => useContext(dispatchContext)