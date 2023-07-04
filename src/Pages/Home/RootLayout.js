import "./RootLayout.css"
import React, { useEffect, useState }  from "react"
import {Link, Outlet} from "react-router-dom"
import { UseAuth } from "../../Context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db, storage } from "../../config/firebase";
import { UseMedia } from "../../Context/MediaContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Timestamp, addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { v4 as uuid } from 'uuid';
import Picker from '@emoji-mart/react'

export function RootLayout(){
  const {currentUser} = UseAuth()
  const {stories} = UseMedia()
  const[editing, setEditing]= useState(false)
  const[img, setImg] = useState(null)
  const[showEmojis,setShowEmojis] = useState(false)
  const [input, setInput] = useState('');
  const[error, setError] = useState(false)
   

  const Images=["https://lens-storage.storage.googleapis.com/png/70da173dbc834b4bb6763d61497a247c", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZctKcm1L8v17s92MaieFVgB8fs16dIWM57dcJFb8pA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMnPDKLXy-SPWsPheQfLol1dK8AbOB6zwG0L13lZ2Vg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFtTjGVfyndqQs4bXLI6irHKgXVByWQfogeq700rVsg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TyiRRZgppjo5cmgjSqiJq6zAO_X88bctaHC0VYAhxQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ztZfLq32Qk3F5MCJK4FWSpqREyMbAzE4OKg6Iikowg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPAfuGQCQ44JeIlccF0_BRXUcqA9neAEUToljuGD8NVg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3NeAIgnxIUPIhVmzmi9bti2cTxONWqsWZAzLCOpMMA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKZlYHQHmTr290K_-x2omMfV_Xl4uZHtO7gOgrxKM5pw&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6E1T3Nv6zcK3ZTir7i9OOvlm179rgbaqURNabbX81g&usqp=CAU&ec=48665701",  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3FrjxE6yQQQKp_hLvT_XV39lImu_FBkVqFjTPpKPkeg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUU8CwvrQcAynZHVYTyCcQLVZkaXX921DGp0BRIKu1vA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOLYKINKxHLgMC0KQYHSy9ozTUas4GlH-n1J93EsS2w&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvv7ziu1NxIkQ5WaD1PhtfbaMK18Vicl766BulAg10Q&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4kY52aeKW0wk-eX8HZePpNb73jn9z4s6WKZn6ON8Rg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPKNBy8z42-70ZRp_pcRtKUqvVFrfiaXnhg-1lq6WyQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlXEOQQWYTmsqOwMCjKL--2xoPBaDO5F6b6oV3b3pxqA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5keXx43rQwBatVYjCVkBJQpdQaVCkl3MdDywtCSxBw&usqp=CAU&ec=48665701"]
 
 const navigate = useNavigate();
  const logoutClick = () => {
    signOut(auth)
    navigate("/login")
  }

  const getData = stories.find((story) => story.id === currentUser.uid)


  const handleCreate = () => {
    setEditing(true)
  }

  const handlePost =() =>{
    setEditing(false)
  }
  const removeImage = () => {
    setImg(null)
}
const handleKey = (e) => {
  e.code === "Enter" && handleSubmit()
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
               addDoc(collection(db, "posts"), {
                  uid: currentUser.uid,
                  photoURL: currentUser.photoURL,
                  displayName: currentUser.displayName,
                  input,
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
                      input,
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
     addDoc(collection(db, "posts"), {
       uid: currentUser.uid,
       photoURL: currentUser.photoURL,
       displayName: currentUser.displayName,
       input,
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
           input,
           imgValue: getData?.data?.imgValue ? getData?.data?.imgValue : "",
           timestamp: Timestamp.now(),
           likes: 1
       })
     });
  }
   setInput("");
   setImg(null);
   toast.success("Post Successfull")
   setEditing(false)
}
const addEmoji = (e) => {
  let sym = e.unified.split("-");
  let codesArray = [];
  sym.forEach((el) => codesArray.push("0x" + el));
  let emoji = String.fromCodePoint(...codesArray);
  setInput(input + emoji);
};
 
    return(
        <>
         <div className="root-layout">
         <header>
        <nav className="nav">
          <div className="container">
          <div className="backarrow"><Link to="/HomePage"><span class="material-symbols-outlined">keyboard_double_arrow_left</span></Link></div>
            <Link to="/HomePage"><h2 className="log">Socialio</h2></Link>
            <div className="search-bar">
            <span class="material-symbols-outlined">search</span>
                <input type="search" placeholder="search for"/>
            </div>
            <div className="create">
                <label className="btn btn-primary postbtnnav" for="create-post" onClick={handleCreate}>Create</label>
                <Link to="/ProfilePage"><div className="profile-photo">
                   {getData && <img src={getData?.data?.photoURL ?  getData?.data?.photoURL : Images[getData.data.imgValue]} alt=""/>}
                </div></Link>
                <span class="material-symbols-outlined" onClick={logoutClick}>logout</span>
            </div>
          </div>
          {editing && (
        <div
          style={{
            position: "relative",
            top: 0,
            left: "15rem",
            width: "50%",
            height: "100%",
            backgroundColor: "white",
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
                    { getData && <img src={getData?.data?.photoURL ?  getData?.data?.photoURL : Images[getData.data.imgValue]} alt="create-pic"/>}                    
                    <input type="text"  placeholder={"What's happening  " + currentUser.displayName + "?"}  id="create-post" value={input} onChange={(e)=> setInput(e.target.value)} onKeyDown={handleKey}/>
                </div>
                {img && (
                <div className="shareImgContainer">
            <       img src={URL.createObjectURL(img)} alt="" className="shareImg" style={{width:"30%"}} />
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
        </nav>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
      </>
    )
}