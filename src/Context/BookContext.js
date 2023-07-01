import { createContext, useContext,  useState } from "react";



export const BookContext = createContext();


export function BookProvider({children}){
    const [BookMarks, setBookMarks] = useState([])
    const [Likes, setLikes] = useState([])

   
    return(
        <BookContext.Provider value={{BookMarks, setBookMarks,Likes, setLikes}}>
            {children}
        </BookContext.Provider>
    )
}


export const UseBook = () => useContext(BookContext)