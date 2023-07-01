import "./FollowersCard.css"
import {useState, useEffect} from "react"
import { UseMedia } from "../../Context/MediaContext"
import {UseAuth} from "../../Context/AuthContext"
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";


export function FollowersCard({user}){
    const {currentUser} = UseAuth();
    const[Followed, setFollowed] = useState() 
    const[followers, setFollowers] = useState([])
    const {stories} = UseMedia()
    const Images=["https://lens-storage.storage.googleapis.com/png/70da173dbc834b4bb6763d61497a247c", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZctKcm1L8v17s92MaieFVgB8fs16dIWM57dcJFb8pA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMnPDKLXy-SPWsPheQfLol1dK8AbOB6zwG0L13lZ2Vg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFtTjGVfyndqQs4bXLI6irHKgXVByWQfogeq700rVsg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TyiRRZgppjo5cmgjSqiJq6zAO_X88bctaHC0VYAhxQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ztZfLq32Qk3F5MCJK4FWSpqREyMbAzE4OKg6Iikowg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPAfuGQCQ44JeIlccF0_BRXUcqA9neAEUToljuGD8NVg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3NeAIgnxIUPIhVmzmi9bti2cTxONWqsWZAzLCOpMMA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKZlYHQHmTr290K_-x2omMfV_Xl4uZHtO7gOgrxKM5pw&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6E1T3Nv6zcK3ZTir7i9OOvlm179rgbaqURNabbX81g&usqp=CAU&ec=48665701",  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3FrjxE6yQQQKp_hLvT_XV39lImu_FBkVqFjTPpKPkeg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUU8CwvrQcAynZHVYTyCcQLVZkaXX921DGp0BRIKu1vA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOLYKINKxHLgMC0KQYHSy9ozTUas4GlH-n1J93EsS2w&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvv7ziu1NxIkQ5WaD1PhtfbaMK18Vicl766BulAg10Q&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4kY52aeKW0wk-eX8HZePpNb73jn9z4s6WKZn6ON8Rg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPKNBy8z42-70ZRp_pcRtKUqvVFrfiaXnhg-1lq6WyQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlXEOQQWYTmsqOwMCjKL--2xoPBaDO5F6b6oV3b3pxqA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5keXx43rQwBatVYjCVkBJQpdQaVCkl3MdDywtCSxBw&usqp=CAU&ec=48665701"]
    const getData = stories.find((story) => story.id === currentUser.uid)

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

  
    console.log(user)
   

    useEffect(()=> {
            setFollowed(followers.findIndex((book) => book.id === user?.id)!== -1)
    },[followers, user?.id])

   


    const Follow = async (user) => {
        if(Followed){
            await deleteDoc(doc(db, "users", currentUser.uid, "Followers", user.id))
            await updateDoc(doc(db, "users", currentUser.uid), {
                following : followers.length-1
              });
              await updateDoc(doc(db, "users", user.id), {
                followers : followers.length-1
              });
        }
        else{
            await setDoc(doc(db, "users", currentUser.uid, "Followers", user.id),{
                userId: user?.data?.uid,
                displayName: user?.data?.displayName,
                email: user?.data?.email,
                photoURL: user?.data?.photoURL ? user?.data?.photoURL : "" ,
                imgValue: getData?.data?.imgValue,
            })
            await updateDoc(doc(db, "users", currentUser.uid), {
                following : followers.length+1
              });
              await updateDoc(doc(db, "users", user.id), {
                followers : followers.length+1
              });
        }

       

    }
    
    return(
        <>
        <div className="FollowersCard">
                    <div className="follower">
                        <div>
                            <img className="followerImg" src={user?.data?.photoURL ? user?.data?.photoURL : Images[user?.data?.imgValue]}  alt="profilepic"/>
                            <div className="name">
                                <span>{user?.data?.displayName}</span>
                                <span>@{user?.data?.displayName}</span>
                            </div>
                        </div>
                        <button className="follow-btn" onClick={(e)=>Follow(user)}>{Followed ? "UnFollow" : "Follow"}</button>
                    </div>
        </div>
        </>
    )
}