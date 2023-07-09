import "./UserProfiles.css"
import { Link, useLocation } from "react-router-dom"
import { SideNav } from "../../Pages/SideNav/SideNav"
import { UseAuth } from "../../Context/AuthContext"
import { UseMedia } from "../../Context/MediaContext"
import { useEffect, useState } from "react"
import { collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { toast } from "react-toastify"
import { Post } from "../Posts/Post"

export function UserProfiles(){
    const {currentUser} = UseAuth()
    const {stories} = UseMedia()
    const location = useLocation()
    const[prefUsers, setPrefUsers] = useState([])
    const[Followed, setFollowed] = useState() 
    const[followers, setFollowers] = useState([])
    const user = location.state.post
    const Images=["https://lens-storage.storage.googleapis.com/png/70da173dbc834b4bb6763d61497a247c", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZctKcm1L8v17s92MaieFVgB8fs16dIWM57dcJFb8pA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMnPDKLXy-SPWsPheQfLol1dK8AbOB6zwG0L13lZ2Vg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFtTjGVfyndqQs4bXLI6irHKgXVByWQfogeq700rVsg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TyiRRZgppjo5cmgjSqiJq6zAO_X88bctaHC0VYAhxQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ztZfLq32Qk3F5MCJK4FWSpqREyMbAzE4OKg6Iikowg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPAfuGQCQ44JeIlccF0_BRXUcqA9neAEUToljuGD8NVg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3NeAIgnxIUPIhVmzmi9bti2cTxONWqsWZAzLCOpMMA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKZlYHQHmTr290K_-x2omMfV_Xl4uZHtO7gOgrxKM5pw&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6E1T3Nv6zcK3ZTir7i9OOvlm179rgbaqURNabbX81g&usqp=CAU&ec=48665701",  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3FrjxE6yQQQKp_hLvT_XV39lImu_FBkVqFjTPpKPkeg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUU8CwvrQcAynZHVYTyCcQLVZkaXX921DGp0BRIKu1vA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOLYKINKxHLgMC0KQYHSy9ozTUas4GlH-n1J93EsS2w&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvv7ziu1NxIkQ5WaD1PhtfbaMK18Vicl766BulAg10Q&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4kY52aeKW0wk-eX8HZePpNb73jn9z4s6WKZn6ON8Rg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPKNBy8z42-70ZRp_pcRtKUqvVFrfiaXnhg-1lq6WyQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlXEOQQWYTmsqOwMCjKL--2xoPBaDO5F6b6oV3b3pxqA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5keXx43rQwBatVYjCVkBJQpdQaVCkl3MdDywtCSxBw&usqp=CAU&ec=48665701"] 
    const getData = stories.find((story) => story.id === user?.data?.uid)

    


    useEffect(()=>{
        const getUsersPost = () => {
            const unSub = onSnapshot(doc(db, "usersPosts", user?.data?.uid),
            (doc) => {
                doc.exists()&& setPrefUsers(doc.data().messages)
            }
            )
            return() => {
                unSub();
            }
        }
        user?.data?.uid && getUsersPost()
    },[user?.data?.uid])

    useEffect(()=>{
        const unSub = onSnapshot(collection(db, "users", currentUser.uid, "Followers"),(snapshot) => setFollowers(snapshot.docs.map((snapshot)=> ({
            id: snapshot.id,
            data: snapshot.data()
        }) 
        )))
        return () => {
            unSub()
        }
    },[currentUser.uid, setFollowers])

   

    useEffect(()=> {
            setFollowed(followers.findIndex((book) => book.id === user?.data?.uid)!== -1)
    },[followers, user?.data?.uid])

   


    const Follow = async (user) => {
        if(Followed){
            await deleteDoc(doc(db, "users", currentUser.uid, "Followers", user?.data?.uid))
            await updateDoc(doc(db, "users", currentUser.uid), {
                following : followers.length-1
              });
              await updateDoc(doc(db, "users", user.id), {
                followers : followers.length-1
              });
              toast.error(`You Unfollowed ${user?.data?.displayName}`)
        }
        else{
            await setDoc(doc(db, "users", currentUser.uid, "Followers", user?.data?.uid),{
                userId: user?.data?.uid,
                displayName: user?.data?.displayName,
                email: user?.data?.email ? user?.data?.email : "" ,
                photoURL: user?.data?.photoURL ? user?.data?.photoURL : "" ,
                imgValue: getData?.data?.imgValue ? getData?.data?.imgValue : "" ,
            })
            await updateDoc(doc(db, "users", currentUser.uid), {
                following : followers.length+1
              });
              await updateDoc(doc(db, "users", user?.data?.uid), {
                followers : followers.length+1
              });
              toast.success(`You Followed ${user?.data?.displayName}`)
        }
    }

    return(
        <>
        <div className="userProf">
            <div className="container" style={{marginLeft:"1rem"}}>
            <div className="left">
                <a className="profile" href="/ProfilePage">
                    <div className="profile-photo">
                    {getData && <img src={currentUser.photoURL ?  currentUser.photoURL : Images[getData.data.imgValue]} alt=""/>}
                    </div>
                    <div className="handle">
                        <h4>{currentUser.displayName}</h4>
                        <p className="text-muted">
                            @{currentUser.displayName}
                        </p>
                    </div>
                </a>
                <div className="sidebar">
                    <SideNav/>
                </div>
            </div>
            </div>
            <div className="userdata">
                <div className="userProfile">
                <div className="userProfile-img">
                    <img src={user?.data?.photoURL ?  user?.data?.photoURL : Images[user?.data?.imgValue]} alt=""/>
                    <h3>{user?.data?.displayName}</h3>
                </div>
                <div className="userProfileInfo">
                    <div className="postsCount">
                        <span><strong>{prefUsers.length} Posts</strong></span>
                    </div>
                    <div className="followersCount">
                        {getData && <span><strong>{getData?.data?.followers ? getData?.data?.followers : 0} Followers</strong></span>}
                    </div>
                    <div className="followingCount">
                    {getData && <span><strong>{getData?.data?.following ? getData?.data?.following : 0} Following</strong></span>}
                    </div>
                </div>
            </div>
            <div className="userProfileAbout">
                <div className="userProfile-about">
                    {getData &&<div>
                        <p style={{textTransform:"uppercase"}}>@{getData.data.userName}</p>
                        <p>{getData.data.bio}</p>
                        <p>Age:{getData.data.birthday}</p>
                        <p>{getData.data.portfolio}</p>
                        </div>}
                    
                </div>
                <div className="userProfile-btns">
                    <div className="btns-div">
                        <button  className="btn btn-primary" onClick={(e)=>Follow(user)}>{Followed ? "UnFollow" : "Follow"}</button>
                        <button  className="btn btn-primary">Contact</button>
                        <button  className="btn btn-primary">Email</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}