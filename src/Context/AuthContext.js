import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";



export const AuthContext = createContext();


export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState({})


    useEffect(()=> {
        const unSub = onAuthStateChanged(auth, (user) => {
           setCurrentUser(user)
          });
        return() => {
            unSub()
        }  
    },[])
    
   

   
    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}


export const UseAuth = () => useContext(AuthContext)