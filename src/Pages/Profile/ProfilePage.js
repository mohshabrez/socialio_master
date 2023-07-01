import { useEffect, useState } from "react"
import "./ProfilePage.css"
import { UseAuth } from "../../Context/AuthContext"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../../config/firebase"
import { UsersPost } from "../../components/UserPosts/UserPosts"
import { Link } from "react-router-dom"
import { UseMedia } from "../../Context/MediaContext"




export function ProfilePage(){
    const[usersPost, setUsersPosts ] = useState([])
    const {currentUser} = UseAuth()
    const {stories} = UseMedia()
    const Images=["https://lens-storage.storage.googleapis.com/png/70da173dbc834b4bb6763d61497a247c", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZctKcm1L8v17s92MaieFVgB8fs16dIWM57dcJFb8pA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMnPDKLXy-SPWsPheQfLol1dK8AbOB6zwG0L13lZ2Vg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFtTjGVfyndqQs4bXLI6irHKgXVByWQfogeq700rVsg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TyiRRZgppjo5cmgjSqiJq6zAO_X88bctaHC0VYAhxQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ztZfLq32Qk3F5MCJK4FWSpqREyMbAzE4OKg6Iikowg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPAfuGQCQ44JeIlccF0_BRXUcqA9neAEUToljuGD8NVg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3NeAIgnxIUPIhVmzmi9bti2cTxONWqsWZAzLCOpMMA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKZlYHQHmTr290K_-x2omMfV_Xl4uZHtO7gOgrxKM5pw&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6E1T3Nv6zcK3ZTir7i9OOvlm179rgbaqURNabbX81g&usqp=CAU&ec=48665701",  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3FrjxE6yQQQKp_hLvT_XV39lImu_FBkVqFjTPpKPkeg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUU8CwvrQcAynZHVYTyCcQLVZkaXX921DGp0BRIKu1vA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOLYKINKxHLgMC0KQYHSy9ozTUas4GlH-n1J93EsS2w&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvv7ziu1NxIkQ5WaD1PhtfbaMK18Vicl766BulAg10Q&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4kY52aeKW0wk-eX8HZePpNb73jn9z4s6WKZn6ON8Rg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPKNBy8z42-70ZRp_pcRtKUqvVFrfiaXnhg-1lq6WyQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlXEOQQWYTmsqOwMCjKL--2xoPBaDO5F6b6oV3b3pxqA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5keXx43rQwBatVYjCVkBJQpdQaVCkl3MdDywtCSxBw&usqp=CAU&ec=48665701"]

    // const sortedComments = comment.sort((a,b) => b.data.timestamp - a.data.timestamp )

    const getData = stories.find((story) => story.id === currentUser.uid)

    useEffect(()=>{
        const getUsersPost = () => {
            const unSub = onSnapshot(doc(db, "usersPosts", currentUser.uid),
            (doc) => {
                doc.exists()&& setUsersPosts(doc.data().messages)
            }
            )
            return() => {
                unSub();
            }
        }
        currentUser.uid && getUsersPost()
    },[currentUser.uid])

    
    console.log(usersPost.length)

    return(
        <>
        <div className="profilePage">
            <div className="profileImg">
                <div className="profile-img">
                {getData && <img src={currentUser.photoURL ?  currentUser.photoURL : Images[getData.data.imgValue]} alt=""/>}
                </div>
                <div className="profileInfo">
                    <div className="postsCount">
                        {getData && <span><strong>{usersPost.length} Posts</strong></span>}
                    </div>
                    <div className="followersCount">
                        {getData && <span><strong>{getData?.data?.followers ? getData?.data?.followers : 0} Followers</strong></span>}
                    </div>
                    <div className="followingCount">
                    {getData && <span><strong>{getData?.data?.following ? getData?.data?.following : 0} Following</strong></span>}
                    </div>
                </div>
            </div>
            <div className="About">
                <div className="profile-about">
                    {getData &&<div>
                        <p style={{textTransform:"uppercase"}}>@{getData.data.userName}</p>
                        <p>{getData.data.bio}</p>
                        <p>Age:{getData.data.birthday}</p>
                        <p>{getData.data.portfolio}</p>
                        </div>}
                    
                </div>
                <div className="profile-btns">
                    <div className="btns-div">
                        <Link to="/EditProfile"><button  className="btn btn-primary">Edit Profile</button></Link>
                        <button  className="btn btn-primary">Contact</button>
                        <button  className="btn btn-primary">Email</button>
                    </div>
                </div>
            </div>
            <div className="profile-posts">
        {usersPost.map((post) => (
            <UsersPost key={post.id} post ={post} />
        ))}
            </div>
        </div>
        </>
    )
}