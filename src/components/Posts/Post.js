import { useEffect, useState } from "react";
import "./Post.css"
import TimeAgo from 'timeago-react';
import { Timestamp, addDoc, arrayUnion, collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import {UseAuth} from "../../Context/AuthContext"
import { UseMedia } from "../../Context/MediaContext";
import { UseBook } from "../../Context/BookContext";
import { PopUp } from "../PopUp/PopUp";
import { v4 as uuid } from 'uuid';
import heartFill from "../../Images/heartfill.png"
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import Picker from '@emoji-mart/react'

export function Post({post}){
    const [editing, setEditing] = useState(false);
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
    const {stories, posts} = UseMedia()
    const[img, setImg] = useState(null)
    const[showEmojis,setShowEmojis] = useState(false)
    const [input, setInput] = useState('');
    const [editInput, setEditInput] = useState(post?.data?.input)
    const[error, setError] = useState(false)
    const navigate = useNavigate()
    const[Followed, setFollowed] = useState() 
    const[followers, setFollowers] = useState([])
    const[following, setFollowing] = useState(false)
   

    const Images=["https://lens-storage.storage.googleapis.com/png/70da173dbc834b4bb6763d61497a247c", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZctKcm1L8v17s92MaieFVgB8fs16dIWM57dcJFb8pA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMnPDKLXy-SPWsPheQfLol1dK8AbOB6zwG0L13lZ2Vg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFtTjGVfyndqQs4bXLI6irHKgXVByWQfogeq700rVsg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TyiRRZgppjo5cmgjSqiJq6zAO_X88bctaHC0VYAhxQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ztZfLq32Qk3F5MCJK4FWSpqREyMbAzE4OKg6Iikowg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPAfuGQCQ44JeIlccF0_BRXUcqA9neAEUToljuGD8NVg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3NeAIgnxIUPIhVmzmi9bti2cTxONWqsWZAzLCOpMMA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKZlYHQHmTr290K_-x2omMfV_Xl4uZHtO7gOgrxKM5pw&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6E1T3Nv6zcK3ZTir7i9OOvlm179rgbaqURNabbX81g&usqp=CAU&ec=48665701",  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3FrjxE6yQQQKp_hLvT_XV39lImu_FBkVqFjTPpKPkeg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUU8CwvrQcAynZHVYTyCcQLVZkaXX921DGp0BRIKu1vA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOLYKINKxHLgMC0KQYHSy9ozTUas4GlH-n1J93EsS2w&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvv7ziu1NxIkQ5WaD1PhtfbaMK18Vicl766BulAg10Q&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4kY52aeKW0wk-eX8HZePpNb73jn9z4s6WKZn6ON8Rg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPKNBy8z42-70ZRp_pcRtKUqvVFrfiaXnhg-1lq6WyQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlXEOQQWYTmsqOwMCjKL--2xoPBaDO5F6b6oV3b3pxqA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5keXx43rQwBatVYjCVkBJQpdQaVCkl3MdDywtCSxBw&usqp=CAU&ec=48665701"]
    
    const getData = stories.find((story) => story.id === currentUser.uid)

    const sortedComments = comment.sort((a,b) => b.data.timestamp - a.data.timestamp )

    

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
        toast.success("Commented Successfully")
    }

    const likePost = async() => {
        if(liked){
            await deleteDoc(doc(db, "posts", post.id , "likes", currentUser.uid))
            await updateDoc(doc(db, "posts", post.id), {
                likes: Likes.length - 1
              });
              toast.info("UnLike the Post")
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
              toast.success("Liked the Post")
        }
    }

    const BookMark = async () => {
        if(BookMarked){
            await deleteDoc(doc(db, "users", currentUser.uid, "BookMarks", post.id))
            toast.error("BookMark Removed")
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
            toast.info("BookMark Added")
        }
       
    }

    const handleButtonClick = () => {
        currentUser?.uid === post?.data?.uid ? setMyPost(true) : setMyPost(false)
        setPopupVisible(!isPopupVisible);
      };

      const handleEdit = (post) => {
        setPopupVisible(false)
        setEditing(true)
    }
      const handlePost =() =>{
        setEditing(false)
      }

    const handleDelete = async () => {
        try{
            await deleteDoc(doc(db, "posts",  post.id))
            toast.error("Deleted The Post")
        }
         catch(e){
            console.log(e)
         }
    }
    const removeImage = () => {
        setImg(null)
    }
    
    const handleSubmit =  () =>{
        if(img){
         const storageRef = ref(storage, "Posts/" + uuid());
         
         const uploadTask = uploadBytesResumable(storageRef, img);
         
         uploadTask.on(
             'state_changed', 
           (snapshot) => {
             
             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             console.log('Upload is ' + progress + '% done');
             switch (snapshot.state) {
               case 'paused':
                 console.log('Upload is paused');
                 break;
               case 'running':
                 console.log('Upload is running');
                 break;
                 default: 
                 console.log("some error occurred")
             }
           }, 
           (error) => {
             setError(true)
           }, 
           () => {
             try{
                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateDoc(doc(db, "posts", post.id), {
                        uid: currentUser.uid,
                        photoURL: currentUser.photoURL,
                        displayName: currentUser.displayName,
                        input: editInput,
                        img: downloadURL,
                        imgValue: getData?.data?.imgValue ? getData?.data?.imgValue : "",
                        timestamp: serverTimestamp(),
                        likes: 0
                      });
                       updateDoc(doc(db, "usersPosts", currentUser.uid),{
                        messages: arrayUnion({
                            id: uuid(),
                            uid: currentUser.uid,
                            photoURL: currentUser.photoURL,
                            displayName: currentUser.displayName,
                            input: editInput,
                            img: downloadURL,
                            imgValue: getData?.data?.imgValue ? getData?.data?.imgValue : "",
                            timestamp: Timestamp.now(),
                            likes: 0
                        })
                      }); 
                });
             }
             catch(e){
                 console.log(e)
             }
             
           }
         ); 
        }
        else{
            updateDoc(doc(db, "posts", post.id), {
             uid: currentUser.uid,
             photoURL: currentUser.photoURL,
             displayName: currentUser.displayName,
             input: editInput,
             imgValue: getData?.data?.imgValue ? getData?.data?.imgValue : "",
             timestamp: serverTimestamp(),
             likes: 1
           });
             updateDoc(doc(db, "usersPosts", currentUser.uid),{
             messages: arrayUnion({
                 id: uuid(),
                 uid: currentUser.uid,
                 photoURL: currentUser.photoURL,
                 displayName: currentUser.displayName,
                 input: editInput,
                 imgValue: getData?.data?.imgValue ? getData?.data?.imgValue : "",
                 timestamp: Timestamp.now(),
                 likes: 1
             })
           });
        }
         setInput("");
         setImg(null);
         setEditing(false)
     }
 
     const handleKey = (e) => {
        e.code === "Enter" && handleSubmit()
    }

 
    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
        setEditInput(editInput + emoji)
      };
    
    const handleProfile = () => {
      navigate("/UserProfiles", {state:{post}})
    }

    setTimeout(() => {
      setPopupVisible(false)
    }, 8000);


    return(
        <div className="feed">
        <div className="head">
            <div className="user">
                <div className="profile-photo">
                    <label onClick={handleProfile}><img  src={post?.data?.photoURL ? post?.data?.photoURL : Images[post?.data?.imgValue]} alt="feed-img"/></label> 
                </div>
                <div className="ingo">
                <label to="/ProfilePage"><h3>{post?.data?.displayName}</h3></label>
                    <small>India,<TimeAgo datetime={new Date(post?.data?.timestamp?.toDate()).toLocaleString()} locale='en'/></small>
                </div>
            </div>
            <a className="edit"><span class="material-symbols-outlined" onClick={()=>handleButtonClick()} style={{cursor:"pointer"}}>more_horiz</span>
            {isPopupVisible && (
            <PopUp onEdit={() =>handleEdit(post)} onDelete={(e) => handleDelete()} unFollow={()=> handleProfile(post)} mypost={mypost} />
            )}
            </a>
        </div>
        
        <div className="postinputline"><p style={{fontSize:"1.5rem"}}>{post?.data?.input}</p></div>
        {post?.data?.img && (
                <div className="photo">
                <img src={post?.data?.img} alt="feedImg"/>
            </div>
        )}
        {post?.data?.video && (
           <div className="photo">
            <video src= {post?.data?.video} controls autoPlay loop/>
          </div>
        )}
        <div className="action-button">
            <div className="interaction-buttons">
                <a onClick={(e)=> {likePost()}}>{liked ? <span><img className="heartFill" src={heartFill} alt="heartFill"/></span>:<span class="material-symbols-outlined">favorite</span>}</a>
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
            <p><b>{post?.data?.displayName}<br></br></b>{post?.data?.input}<span className="harsh-tag">{}</span></p>
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
        {editing && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "70%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft:"5rem"
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px"
            }}
          >
            <h1>Edit Post</h1>
            <span class="material-symbols-outlined" onClick={handlePost} style={{marginLeft:"40rem", backgroundColor:"white",borderRadius:"50%",cursor:"pointer"}}>cancel</span>
            <div className="create-post">
              <div className="post-wrapper">
                <div className="post-profile-photo">
                    { getData && <img src={currentUser.photoURL ?  currentUser.photoURL : Images[getData.data.imgValue]} alt="create-pic"/>}                    
                    <input type="text"  placeholder={"What's happening  " + currentUser.displayName + "?"}  id="create-post" value={editInput} onChange={(e)=> setEditInput(e.target.value)} onKeyDown={handleKey}/>
                </div>
                {img && (
                <div className="shareImgContainer">
                <img src={URL.createObjectURL(img)} alt="" className="shareImg" style={{width:"30%"}} />
                    <span class="material-symbols-outlined" onClick={removeImage} style={{position:"absolute", top:"0", right:"32rem", backgroundColor:"white",borderRadius:"50%",cursor:"pointer"}}>cancel</span>
                </div>
                )}
                <div className="postbtnOptions">
                <div className="postOptions">
                   <label> <input className="option" style={{display:"none"}}  type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setImg(e.target.files[0])} /><span class="material-symbols-outlined" style={{color:"var(--photo)", marginTop:"0.5rem"}}>image</span></label>
                    <div className="option" style={{color:"var(--video)"}}><span class="material-symbols-outlined">smart_display</span></div>
                    <div className="option" style={{color:"var(--location)"}} onClick={() => setShowEmojis(!showEmojis)}><span class="material-symbols-outlined">add_reaction</span></div>
                    <div className="option" style={{color:"var(--schedule)"}}><span class="material-symbols-outlined">calendar_month</span></div>
                </div>
                <input type="submit" onClick={handleSubmit}  className="btn btn-primary postbtn"/>
                </div>
            </div>
            {showEmojis && (
          <div className="emoji">
            <Picker onEmojiSelect={addEmoji} />
          </div>
        )}
            </div>
          </div>
        </div>
      )}
    </div>



    )
}