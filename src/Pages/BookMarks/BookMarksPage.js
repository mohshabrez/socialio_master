import { UseAuth } from "../../Context/AuthContext"
import { UseMedia } from "../../Context/MediaContext"
import { SideNav } from "../SideNav/SideNav"
import "./BookMarks.css"
import { useLocation } from "react-router-dom"

export function BookMarksPage(){
    const {currentUser} = UseAuth()
    const location = useLocation()
    const book = location.state
    const {stories} = UseMedia()
    const Images=["https://lens-storage.storage.googleapis.com/png/70da173dbc834b4bb6763d61497a247c", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZctKcm1L8v17s92MaieFVgB8fs16dIWM57dcJFb8pA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMnPDKLXy-SPWsPheQfLol1dK8AbOB6zwG0L13lZ2Vg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFtTjGVfyndqQs4bXLI6irHKgXVByWQfogeq700rVsg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TyiRRZgppjo5cmgjSqiJq6zAO_X88bctaHC0VYAhxQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ztZfLq32Qk3F5MCJK4FWSpqREyMbAzE4OKg6Iikowg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPAfuGQCQ44JeIlccF0_BRXUcqA9neAEUToljuGD8NVg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3NeAIgnxIUPIhVmzmi9bti2cTxONWqsWZAzLCOpMMA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKZlYHQHmTr290K_-x2omMfV_Xl4uZHtO7gOgrxKM5pw&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6E1T3Nv6zcK3ZTir7i9OOvlm179rgbaqURNabbX81g&usqp=CAU&ec=48665701",  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3FrjxE6yQQQKp_hLvT_XV39lImu_FBkVqFjTPpKPkeg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUU8CwvrQcAynZHVYTyCcQLVZkaXX921DGp0BRIKu1vA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOLYKINKxHLgMC0KQYHSy9ozTUas4GlH-n1J93EsS2w&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvv7ziu1NxIkQ5WaD1PhtfbaMK18Vicl766BulAg10Q&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4kY52aeKW0wk-eX8HZePpNb73jn9z4s6WKZn6ON8Rg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPKNBy8z42-70ZRp_pcRtKUqvVFrfiaXnhg-1lq6WyQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlXEOQQWYTmsqOwMCjKL--2xoPBaDO5F6b6oV3b3pxqA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5keXx43rQwBatVYjCVkBJQpdQaVCkl3MdDywtCSxBw&usqp=CAU&ec=48665701"]
    const getData = stories.find((story) => story.id === currentUser.uid)
    

    return(
        <div className="BookMarksPage">
           <div className="container">
            <div className="left">
                <a className="profile" href="//">
                    <div className="profile-photo">
                        <img src={currentUser.photoURL ? currentUser.photoURL : Images[getData?.data?.imgValue]} alt="profileImg" />
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
            <div className="bookmarksTab">
                <h1>Book Marks</h1>
                {book.length > 0 ? book.map((bookMark) => {
                    return(
                        <div className="bookmarks">
                            <div>
                            <img className="bookmarksProfile" src={bookMark?.data?.photo ? bookMark?.data?.photo : Images[bookMark?.data?.imgValue]} alt="bookmarksImg" />
                            </div>
                            <div className="bookmarksDetails">
                                <p style={{fontSize:"small", fontWeight:"bolder"}}>{bookMark?.data?.displayName}<small style={{marginLeft:"1rem", fontWeight:"normal"}}>India,</small></p>
                                <h5>{bookMark?.data?.input}</h5>
                            </div> 
                            <div className="postImg"> 
                                {bookMark?.data?.postImg && <img  src={bookMark?.data?.postImg} alt="postimage"/>}
                            </div>
                    </div> 
                    )
                })
               : ""}
            </div>
        </div>
    )
}