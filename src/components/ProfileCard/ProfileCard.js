import { Link } from "react-router-dom"
import {UseAuth} from "../../Context/AuthContext"
import {UseMedia} from "../../Context/MediaContext"
import "./ProfileCard.css"
import { useState } from "react"
export function ProfileCard(){
    const {currentUser} = UseAuth()
    const {stories} = UseMedia()
    const[bgImg, setBgImg] = useState("")
    const Images=["https://lens-storage.storage.googleapis.com/png/70da173dbc834b4bb6763d61497a247c", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZctKcm1L8v17s92MaieFVgB8fs16dIWM57dcJFb8pA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMnPDKLXy-SPWsPheQfLol1dK8AbOB6zwG0L13lZ2Vg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFtTjGVfyndqQs4bXLI6irHKgXVByWQfogeq700rVsg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TyiRRZgppjo5cmgjSqiJq6zAO_X88bctaHC0VYAhxQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ztZfLq32Qk3F5MCJK4FWSpqREyMbAzE4OKg6Iikowg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPAfuGQCQ44JeIlccF0_BRXUcqA9neAEUToljuGD8NVg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3NeAIgnxIUPIhVmzmi9bti2cTxONWqsWZAzLCOpMMA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKZlYHQHmTr290K_-x2omMfV_Xl4uZHtO7gOgrxKM5pw&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6E1T3Nv6zcK3ZTir7i9OOvlm179rgbaqURNabbX81g&usqp=CAU&ec=48665701",  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3FrjxE6yQQQKp_hLvT_XV39lImu_FBkVqFjTPpKPkeg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUU8CwvrQcAynZHVYTyCcQLVZkaXX921DGp0BRIKu1vA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOLYKINKxHLgMC0KQYHSy9ozTUas4GlH-n1J93EsS2w&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvv7ziu1NxIkQ5WaD1PhtfbaMK18Vicl766BulAg10Q&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4kY52aeKW0wk-eX8HZePpNb73jn9z4s6WKZn6ON8Rg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPKNBy8z42-70ZRp_pcRtKUqvVFrfiaXnhg-1lq6WyQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlXEOQQWYTmsqOwMCjKL--2xoPBaDO5F6b6oV3b3pxqA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5keXx43rQwBatVYjCVkBJQpdQaVCkl3MdDywtCSxBw&usqp=CAU&ec=48665701"]
    const getData = stories.find((story) => story.id === currentUser.uid)


//     const handleRegister= async (e) => {
//         e.preventDefault()

//         if(indiImg){
//             try{
//                 const res = await createUserWithEmailAndPassword(auth, email, password)
                
//                 const storageRef = ref(storage, "usersImages/" +  displayName);
    
//                 const uploadTask = uploadBytesResumable(storageRef, indiImg);
    
//                 uploadTask.on('state_changed',
//                     (snapshot) => {
//                 // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     console.log('Upload is ' + progress + '% done');
//                 switch (snapshot.state) {
//                     case 'paused':
//                     console.log('Upload is paused');
//                 break;
//                     case 'running':
//                     console.log('Upload is running');
//                 break;
//                 default :
//                     console.log('Upload got error')
//                 }
//                 }, 
//                 (error) => {
//                 // A full list of error codes is available at
//                 // https://firebase.google.com/docs/storage/web/handle-errors
//                 switch (error.code) {
//                  case 'storage/unauthorized':
//                 // User doesn't have permission to access the object
//                     break;
//                 case 'storage/canceled':
//                 // User canceled the upload
//                 break;
//                 case 'storage/unknown':
//             // Unknown error occurred, inspect error.serverResponse
//             break;
//             default :
//             console.log('storage got error')
//           // ...
//           // ...
//         }
//       }, 
//       () => {
//         // Upload completed successfully, now we can get the download URL
//         try{
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                 updateProfile(res.user, {
//                     displayName, 
//                     photoURL: downloadURL,
//                  });             
          
//               setDoc(doc(db, "users", res.user.uid), {
//                  uid: res.user.uid,
//                  displayName,
//                  email,
//                  photoURL: downloadURL,
//                  username: userName,
//                  bio: bio,
//                  birthday: birthday,
//                  phoneNumber: phoneNumber,
//                  portfolio: portfolio,
//                  handleAvatar: imgValue
//                  });
    
//               setDoc(doc(db, "usersPosts", res.user.uid), {messages:[]})    
//               }); 
//               navigate("/Login")   
//         }
//         catch(error){
//             console.log(error.message)
//         }    
//         });
//       }
//      catch(error){
//          console.log(error.message)
//         setError(true)
//         }
            
// }
// else{
//     console.log("lets workon these")
//     const res = await createUserWithEmailAndPassword(auth, email, password)
                
//     updateProfile(res.user, {
//         displayName, 
        
//      });             

//   setDoc(doc(db, "users", res.user.uid), {
//      uid: res.user.uid,
//      displayName,
//      email,
//      userName,
//      bio,
//      birthday,
//      phoneNumber,
//      portfolio,
//      imgValue
//      });

//     setDoc(doc(db, "usersPosts", res.user.uid), {messages:[]})     
    
    
            
// }
//         }


    return(
        <>
        <div className="profileCard">
           <div className="profileImages">
                <img src="https://static.wixstatic.com/media/c2cda0_ccf77c82f1ad463a82fcb49f9ed3b6da~mv2.png/v1/fit/w_1000,h_600,al_c,q_80/file.png" alt="coverImg" />
                {getData && <img className="profile-photo-profile" src={getData?.data?.photoURL ?  getData?.data?.photoURL : Images[getData.data.imgValue]} alt="profileImg"/>}
           </div>
           <div className="ProfileName">
             <span>{getData?.data?.displayName}</span>
             <span>{getData?.data?.bio}</span>
           </div>
           <div className="followStatus">
            <hr />
            <div>
                <div className="follow">
                    <span>{getData?.data?.following ? getData?.data?.following : 0}</span>
                    <span>Followings</span>
                </div>
                <div className="vl"></div>
                <div className="follow">
                    <span>{getData?.data?.followers ? getData?.data?.followers : 0}</span>
                    <span>Followers</span>
                </div>
            </div>
            <hr />
           </div>
           <Link to="/ProfilePage" style={{textDecoration:"none", color:"inherit"}}><span className="myprofile">My Profile</span>
           <span class="material-symbols-outlined" style={{marginLeft:"7.3rem", marginTop:"-1rem", }}>expand_more</span></Link>
        </div>
        </>
    )
}