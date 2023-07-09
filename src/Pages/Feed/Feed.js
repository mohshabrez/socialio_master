import { useState } from "react"
import { UseMedia } from "../../Context/MediaContext"
import { Post } from "../../components/Posts/Post"
import "./Feed.css"




export function Feed(){
    const {posts} = UseMedia()
    const[sorting, setSorting] = useState(true)
    const[filter, setFilter] = useState(false)
    const[Title, setTitle] = useState("Posts")
    
    
    // const trends = posts.sort((a,b) => b.data.timestamp - a.data.timestamp)

    let filteredPosts  =  posts
    

    const handleSort = () => {
        filteredPosts = sorting ?   posts.sort((a,b) => b.data.timestamp - a.data.timestamp):""
        setTitle("Latest Posts")
        setSorting(!sorting)
       
    }

    const handleTrend = () => {
        setSorting(!sorting)
        setTitle("Trending Posts")
        filteredPosts = !sorting ? posts.sort((a,b) => b.data.likes - a.data.likes):""
    }

    const handleClick = () => {
        setFilter(!filter)
    }

    setTimeout(() => {
        setFilter(false)
    }, 8000);


    return(
        <>
        <div className="feeds">
            <div className="feeds-btn">
            <h1>{Title}</h1>
            <span class="material-symbols-outlined ontune" onClick={handleClick}>tune</span>
            {filter && (
                 <div className="popupforPosts">
                    <button onClick={handleSort} >Latest Posts</button>
                    <div className="vll"></div>
                    <button onClick={handleTrend}>Trending</button>
               </div>
            )}
            </div>
            <div>
                 {filteredPosts.map((post) => {    
           return(
            <Post key={post.id} post={post}/>
           )
})}
            </div>
       
        </div>
        </>
    )
}