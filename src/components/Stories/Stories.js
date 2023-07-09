import { useState } from "react";
import { UseMedia } from "../../Context/MediaContext"

import "./Stories.css"
export function Stories(){
    const {stories} = UseMedia()
    const [startIndex, setStartIndex] = useState(0);
    const nextSlide = () => {
        const newIndex = Math.min(startIndex + 3, stories.length);
        setStartIndex(newIndex);
        
      };
    
      const prevSlide = () => {
        const newIndex = Math.max(startIndex - 3, 0);
        setStartIndex(newIndex);
       
      };
      
      const visibleStories = stories.slice(startIndex, startIndex + 3);
    
      console.log(startIndex, stories.length)
    const Images=["https://lens-storage.storage.googleapis.com/png/70da173dbc834b4bb6763d61497a247c", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZctKcm1L8v17s92MaieFVgB8fs16dIWM57dcJFb8pA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMnPDKLXy-SPWsPheQfLol1dK8AbOB6zwG0L13lZ2Vg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFtTjGVfyndqQs4bXLI6irHKgXVByWQfogeq700rVsg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TyiRRZgppjo5cmgjSqiJq6zAO_X88bctaHC0VYAhxQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ztZfLq32Qk3F5MCJK4FWSpqREyMbAzE4OKg6Iikowg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPAfuGQCQ44JeIlccF0_BRXUcqA9neAEUToljuGD8NVg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3NeAIgnxIUPIhVmzmi9bti2cTxONWqsWZAzLCOpMMA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKZlYHQHmTr290K_-x2omMfV_Xl4uZHtO7gOgrxKM5pw&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6E1T3Nv6zcK3ZTir7i9OOvlm179rgbaqURNabbX81g&usqp=CAU&ec=48665701",  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3FrjxE6yQQQKp_hLvT_XV39lImu_FBkVqFjTPpKPkeg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUU8CwvrQcAynZHVYTyCcQLVZkaXX921DGp0BRIKu1vA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOLYKINKxHLgMC0KQYHSy9ozTUas4GlH-n1J93EsS2w&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvv7ziu1NxIkQ5WaD1PhtfbaMK18Vicl766BulAg10Q&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4kY52aeKW0wk-eX8HZePpNb73jn9z4s6WKZn6ON8Rg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPKNBy8z42-70ZRp_pcRtKUqvVFrfiaXnhg-1lq6WyQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlXEOQQWYTmsqOwMCjKL--2xoPBaDO5F6b6oV3b3pxqA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5keXx43rQwBatVYjCVkBJQpdQaVCkl3MdDywtCSxBw&usqp=CAU&ec=48665701"]
    return(
        <div className="stories">
            <a className="leftarrow" style={{marginLeft:"-3rem", cursor:"pointer"}}><span class="material-symbols-outlined" style={{fontSize:"300%", color:"gray", position:"relative", top:"4rem", left:"1.5rem"}} onClick={prevSlide} disabled={startIndex === 0}>keyboard_double_arrow_left</span></a>
            {visibleStories.map((post) => {

                const image = post?.data?.photoURL ? post?.data?.photoURL : Images[post?.data?.imgValue]
                const fakeurl = "https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1";

                const styles = {
                    backgroundImage: `url(${image ? image : fakeurl})`,
                  };
                return(
                    <>
                    <div className="story" style={styles}>
                        <div className="profile-photo">
                            <img src={post?.data?.photoURL ? post?.data?.photoURL : Images[post?.data?.imgValue]} alt="profilePic"/>
                        </div>
                        <p className="name">
                            {post?.data?.displayName}
                        </p>
                    </div>
                    </>
                )
            })}
            <a className="rightarrow" style={{marginLeft:"1rem", cursor:"pointer"}}><span class="material-symbols-outlined" style={{fontSize:"300%", position:"relative", top:"2rem" ,left:"-3rem", color:"gray"}} onClick={nextSlide} disabled={startIndex + 6  >= stories.length}>keyboard_double_arrow_right</span></a>
            {/* <div className="story">
                <div className="profile-photo">
                    <img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1" alt="stories-profile"/>
                </div>
                <p className="name">
                    Your Story
                </p>
            </div>
            <div className="story">
                <div className="profile-photo">
                    <img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1" alt="stories-profile"/>
                </div>
                <p className="name">
                    Your Story
                </p>
            </div>
            <div className="story">
                <div className="profile-photo">
                    <img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1" alt="stories-profile"/>
                </div>
                <p className="name">
                    Your Story
                </p>
            </div>
            <div className="story">
                <div className="profile-photo">
                    <img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1" alt="stories-profile"/>
                </div>
                <p className="name">
                    Your Story
                </p>
            </div>
            <div className="story">
                <div className="profile-photo">
                    <img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1" alt="stories-profile"/>
                </div>
                <p className="name">
                    Your Story
                </p>
            </div>
            <div className="story">
                <div className="profile-photo">
                    <img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1" alt="stories-profile"/>
                </div>
                <p className="name">
                     Your Story
                 </p>
            </div> */}
        </div>
    )
}