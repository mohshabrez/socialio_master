import { useEffect, useState } from "react"
import { UseAuth } from "../../Context/AuthContext"
import { addDoc, arrayUnion, collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import TimeAgo from 'timeago-react';
import { UseMedia } from "../../Context/MediaContext";
import { UseBook } from "../../Context/BookContext";
import { PopUp } from "../PopUp/PopUp";


export function UsersPost({post}){
    const {currentUser} = UseAuth();
    const {BookMarks, setBookMarks} = UseBook()
    const [Likes, setLikes] = useState([])
    const[liked, setLiked] = useState(false)
    const[comment, setComments] = useState([])
    const[commentInput, setCommentInput] = useState("")
    const[commentVisible, setCommentVisible] = useState(false)
    const[BookMarked, setBookMarked] = useState(false)
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [mypost, setMyPost] = useState(false)
    const {stories} = UseMedia()
    const[likesArray, setLikesArray] = useState([])

    const Images=["https://lens-storage.storage.googleapis.com/png/70da173dbc834b4bb6763d61497a247c", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZctKcm1L8v17s92MaieFVgB8fs16dIWM57dcJFb8pA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMnPDKLXy-SPWsPheQfLol1dK8AbOB6zwG0L13lZ2Vg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFtTjGVfyndqQs4bXLI6irHKgXVByWQfogeq700rVsg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TyiRRZgppjo5cmgjSqiJq6zAO_X88bctaHC0VYAhxQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ztZfLq32Qk3F5MCJK4FWSpqREyMbAzE4OKg6Iikowg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPAfuGQCQ44JeIlccF0_BRXUcqA9neAEUToljuGD8NVg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3NeAIgnxIUPIhVmzmi9bti2cTxONWqsWZAzLCOpMMA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKZlYHQHmTr290K_-x2omMfV_Xl4uZHtO7gOgrxKM5pw&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6E1T3Nv6zcK3ZTir7i9OOvlm179rgbaqURNabbX81g&usqp=CAU&ec=48665701",  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3FrjxE6yQQQKp_hLvT_XV39lImu_FBkVqFjTPpKPkeg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUU8CwvrQcAynZHVYTyCcQLVZkaXX921DGp0BRIKu1vA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOLYKINKxHLgMC0KQYHSy9ozTUas4GlH-n1J93EsS2w&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvv7ziu1NxIkQ5WaD1PhtfbaMK18Vicl766BulAg10Q&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4kY52aeKW0wk-eX8HZePpNb73jn9z4s6WKZn6ON8Rg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPKNBy8z42-70ZRp_pcRtKUqvVFrfiaXnhg-1lq6WyQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlXEOQQWYTmsqOwMCjKL--2xoPBaDO5F6b6oV3b3pxqA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5keXx43rQwBatVYjCVkBJQpdQaVCkl3MdDywtCSxBw&usqp=CAU&ec=48665701"]
    
    const getData = stories.find((story) => story.id === currentUser.uid)

    const sortedComments = comment.sort((a,b) => b.data.timestamp - a.data.timestamp )

    // console.log(Likes.sort((a,b) => a.length - b.length))

    useEffect(()=>{
        const unSub = onSnapshot(collection(db, "posts", post.id, "likes"),(snapshot) => setLikes(snapshot.docs.map((snapshot)=> ({
            id: snapshot.id,
            data: snapshot.data()
        }) 
        )))
      
        return () => {
            unSub()
        }
    },[ post.id, setLikes])

    

    useEffect(()=> {
            setLiked(Likes.findIndex((like) => like.id === currentUser?.uid)!== -1)
    },[Likes, currentUser.uid])


    useEffect(()=>{
        const unSub = onSnapshot(collection(db, "users", currentUser.uid, "BookMarks"),(snapshot) => setBookMarks(snapshot.docs.map((snapshot)=> ({
            id: snapshot.id,
            data: snapshot.data()
        }) 
        )))
        return () => { 
            unSub()
        }
    },[currentUser.uid, setBookMarks])

  
   

    useEffect(()=> {
            setBookMarked(BookMarks.findIndex((book) => book.id === post?.id)!== -1)
    },[BookMarks, post?.id])



    useEffect(()=>{
        const unSub = onSnapshot(collection(db, "posts", post.id, "comments"),
       (snapshot) => {
        setComments(snapshot.docs.map((snapshot)=> ({
            id: snapshot.id,
            data: snapshot.data()
        }) 
        ))
       })
       return() => {
        unSub()
       }
    },[post.id])

    const handleComment = async (e) => {
        e.preventDefault()

        await addDoc(collection(db, "posts", post.id, "comments"),{
            comment: commentInput,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
            imgValue: getData?.data?.imgValue ? getData?.data?.imgValue : "",
            timestamp: serverTimestamp()
        })
        setCommentVisible(false)
        setCommentInput('')

    }

 

    // const tagList = post.tags.map((tag) =>{return (<>{tag}</>)})

    const likePost = async() => {
        if(liked){
            await deleteDoc(doc(db, "posts", post.id , "likes", currentUser.uid))
            await updateDoc(doc(db, "posts", post.id), {
                likes: Likes.length - 1
              });
       
        }
        else{
            await setDoc(doc(db, "posts", post.id , "likes", currentUser.uid), {
                id: post.id,
                userId: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
                imgValue: getData?.data?.imgValue ? getData?.data?.imgValue : "",
            })
            await updateDoc(doc(db, "posts", post.id), {
                likes: Likes.length+1
              });
       
        }
    }

    const BookMark = async () => {
        if(BookMarked){
            await deleteDoc(doc(db, "users", currentUser.uid, "BookMarks", post.id))
        }
        else{
            await setDoc(doc(db, "users", currentUser.uid, "BookMarks", post.id),{
                PostId: post?.data?.uid,
                photo: post?.data?.photoURL,
               displayName: post?.data?.displayName,
               input: post?.data?.input,
               postImg:  post?.data?.img ? post?.data?.img : "",
               imgValue: getData?.data?.imgValue ? getData?.data?.imgValue : "",
               timestamp: serverTimestamp()
            })
        }
       
    }

    const handleButtonClick = () => {
        currentUser?.uid === post?.data?.uid ? setMyPost(true) : setMyPost(false)
        setPopupVisible(!isPopupVisible);
      };

      const handleEdit = () => {
        setPopupVisible(false)
    }

    const handleDelete = async () => {
        try{
            await deleteDoc(doc(db, "posts",  post.id))
        }
         catch(e){
            console.log(e)
         }
    }

    console.log(post)
    
    return(
        <div className="feed">
        <div className="head">
            <div className="user">
                <div className="profile-photo">
                    <img  src={post?.photoURL ? post?.photoURL : Images[post?.imgValue]} alt="feed-img"/>
                </div>
                <div className="ingo">
                    <h3>{post?.displayName}</h3>
                    <small>India,<TimeAgo datetime={new Date(post?.timestamp?.toDate()).toLocaleString()} locale='en'/></small>
                </div>
            </div>
            <a className="edit"><span class="material-symbols-outlined" onClick={handleButtonClick}>more_horiz</span>
            {isPopupVisible && (
            <PopUp onEdit={() =>handleEdit} onDelete={(e) => handleDelete()} mypost={mypost} />
            )}
            </a>
        </div>
        
        <div className="postinputline">{post?.input}</div>
        {post?.img && (
                <div className="photo">
                <img src={post?.img} alt="feedImg"/>
            </div>
        )}
        <div className="action-button">
            <div className="interaction-buttons">
                <a onClick={(e)=> {likePost()}}><span class="material-symbols-outlined">favorite</span></a>
                <a><span class="material-symbols-outlined" onClick={(e) => setCommentVisible(!commentVisible)}>add_comment</span></a>
                <a><span class="material-symbols-outlined">share</span></a>
            </div>
            <div className="bookmark">
                <a onClick={(e) => {BookMark()}}>{BookMarked ? <span class="material-symbols-outlined">bookmark_added</span> : <span class="material-symbols-outlined">bookmark</span>}</a>
                
            </div>    
        </div>
        <div className="liked-by">
            <span><img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1"/></span>
            <span><img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1"/></span>
            <span><img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1"/></span>
            <p>Liked by <b>{}</b>and <b>{Likes.length} others</b></p>
        </div>
        <div className="caption">
            <p><b>{post?.displayName}<br></br></b>{post?.input}<span className="harsh-tag">{}</span></p>
        </div>
        <div className=" comments text-muted">View all {comment.length} comments</div>
        {commentVisible && <div><div className="commentbox" >
            <input placeholder="comment..." value={commentInput} onChange={(e)=> setCommentInput(e.target.value)} /><button className=" btn btn-primary" onClick={handleComment}>Comment</button>
            </div>
            {comment.length > 0 && <div>
                {sortedComments.map((com) => (
                    <div className="commentsbox">
                       <div className="commentSection">
                        <img className="profile-photo"  src={com.data.photoURL ? com.data.photoURL : Images[com.data.imgValue] }/>
                        <div className="commentInfo">
                            <span>{com.data.displayName}</span><span><small>India,<TimeAgo datetime={new Date(com?.data?.timestamp?.toDate()).toLocaleString()} locale='en'/></small></span>
                            <p>{com.data.comment}</p>
                        </div>
                       </div>
                    </div>
                ))}
                </div>}
            </div>
           
        }
        
    </div>



    )
}