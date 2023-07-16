import { useState } from "react"
import { UseAuth } from "../../Context/AuthContext"
import { SideNav } from "../../Pages/SideNav/SideNav"
import "./EditProfile.css"
import { auth, db, storage } from "../../config/firebase"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { v4 as uuid } from 'uuid';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updateProfile } from "firebase/auth"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { UseMedia } from "../../Context/MediaContext"
import { toast } from "react-toastify"



export function Editprofile(){
    const {currentUser} = UseAuth()
    const navigate = useNavigate();
    const {stories} = UseMedia()
    const Images=["https://lens-storage.storage.googleapis.com/png/70da173dbc834b4bb6763d61497a247c", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZctKcm1L8v17s92MaieFVgB8fs16dIWM57dcJFb8pA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMnPDKLXy-SPWsPheQfLol1dK8AbOB6zwG0L13lZ2Vg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFtTjGVfyndqQs4bXLI6irHKgXVByWQfogeq700rVsg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TyiRRZgppjo5cmgjSqiJq6zAO_X88bctaHC0VYAhxQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ztZfLq32Qk3F5MCJK4FWSpqREyMbAzE4OKg6Iikowg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPAfuGQCQ44JeIlccF0_BRXUcqA9neAEUToljuGD8NVg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3NeAIgnxIUPIhVmzmi9bti2cTxONWqsWZAzLCOpMMA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKZlYHQHmTr290K_-x2omMfV_Xl4uZHtO7gOgrxKM5pw&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6E1T3Nv6zcK3ZTir7i9OOvlm179rgbaqURNabbX81g&usqp=CAU&ec=48665701",  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3FrjxE6yQQQKp_hLvT_XV39lImu_FBkVqFjTPpKPkeg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUU8CwvrQcAynZHVYTyCcQLVZkaXX921DGp0BRIKu1vA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOLYKINKxHLgMC0KQYHSy9ozTUas4GlH-n1J93EsS2w&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvv7ziu1NxIkQ5WaD1PhtfbaMK18Vicl766BulAg10Q&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4kY52aeKW0wk-eX8HZePpNb73jn9z4s6WKZn6ON8Rg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPKNBy8z42-70ZRp_pcRtKUqvVFrfiaXnhg-1lq6WyQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlXEOQQWYTmsqOwMCjKL--2xoPBaDO5F6b6oV3b3pxqA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5keXx43rQwBatVYjCVkBJQpdQaVCkl3MdDywtCSxBw&usqp=CAU&ec=48665701"] 
    const getData = stories.find((story) => story.id === currentUser.uid)
    const[error, setError] = useState(false)
    const[img, setImg] = useState(null)
    const [data, setData] = useState({
        userName: getData?.data?.userName ?  getData?.data?.userName : "",
        newEmail: getData?.data?.email ?  getData?.data?.email : "",
        birthday: getData?.data?.birthday ?  getData?.data?.birthday : "",
        phoneNumber: getData?.data?.phoneNumber ?  getData?.data?.phoneNumber : "",
        bio: getData?.data?.bio ?  getData?.data?.bio : "",
        portfolio: getData?.data?.portfolio ?  getData?.data?.portfolio : "",
        followers: getData?.data?.followers ? getData?.data?.followers: "",
        following: getData?.data?.following ? getData?.data?.following: "",
        Oldpassword:""
    })
    const [startIndex, setStartIndex] = useState(0);
    const[count, setcount] = useState(0)
    const[imgValue, setImgValue] = useState(1)
    const[Avtarvalue, setAvtarValue] = useState(false)


    const handleChange = (e) =>{
        setData((prev) => ({...prev, [e.target.name]: e.target.value}))
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (img) {
          const storageRef = ref(storage, "usersImages/" + uuid());
          const uploadTask = uploadBytesResumable(storageRef, img);
    
          uploadTask.on(
            'state_changed',
            (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case 'paused':
            console.log('Upload is paused');
        break;
            case 'running':
            console.log('Upload is running');
        break;
        default :
            console.log('Upload got error')
        }
        }, 
        (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
         case 'storage/unauthorized':
        // User doesn't have permission to access the object
            break;
        case 'storage/canceled':
        // User canceled the upload
        break;
        case 'storage/unknown':
    // Unknown error occurred, inspect error.serverResponse
    break;
    default :
    console.log('storage got error')
  // ...
  // ...
}
}, 
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateProfile(currentUser, {
                  displayName: data.userName,
                  email: data.newEmail,
                  photoURL: downloadURL,
                });
    
                await setDoc(doc(db, "users", currentUser.uid), {
                  uid: currentUser.uid,
                  photoURL: downloadURL,
                  displayName: data.userName ? data.userName : getData?.data?.userName,
                  userName: data.userName ? data.userName : getData?.data?.userName,
                  email: data.newEmail ? data.newEmail : getData?.data?.email ,
                  phoneNumber: data.phoneNumber ? data.phoneNumber:getData?.data?.phoneNumber ,
                  birthday: data.birthday ? data.birthday : getData?.data?.birthday,
                  bio: data.bio ? data.bio : getData?.data?.bio,
                  portfolio: data.portfolio ? data.portfolio : getData?.data?.portfolio,
                  createdAt: serverTimestamp(),
                  handleAvatar: imgValue
                });
              if(data.Oldpassword !== ""){
                const credential = EmailAuthProvider.credential(
                  currentUser.email,
                  data.Oldpassword
                );
                
                await reauthenticateWithCredential(currentUser, credential).then(
                  async () => {
                    //User reauthenticate
                    await updateEmail(currentUser, data.newEmail);
                  }
                );
              }
              });
            }
          );
        } else {
          await updateProfile(currentUser, {
            displayName: data.userName,
            email: data.newEmail,
          });
    
          await setDoc(doc(db, "users", currentUser.uid), {
            uid: currentUser.uid,
            displayName: data.userName ? data.userName : getData?.data?.userName,
            userName: data.userName ? data.userName : getData?.data?.userName,
            email: data.newEmail ? data.newEmail : getData?.data?.email ,
            phoneNumber: data.phoneNumber ? data.phoneNumber:getData?.data?.phoneNumber ,
            birthday: data.birthday ? data.birthday : getData?.data?.birthday,
            bio: data.bio ? data.bio : getData?.data?.bio,
            portfolio: data.portfolio ? data.portfolio : getData?.data?.portfolio,
            imgValue: imgValue,
            createdAt: serverTimestamp(),
            photoURL: "",
          });
    
          if(data.Oldpassword !== ""){
            const credential = EmailAuthProvider.credential(
              currentUser.email,
              data.Oldpassword
            );
            
            await reauthenticateWithCredential(currentUser, credential).then(
              async () => {
                //User reauthenticate
                await updateEmail(currentUser, data.newEmail);
              }
            );
          }
        }
        if(data.Oldpassword === ""){
          navigate("/HomePage");
          toast.success("Editing Profile done without Authentication")
        }
        else{
          navigate("/Login");
          toast.error("Editing Profile done with Authentication, Login Please!!")
        }
      };

      const handleCancel = () => {
        navigate("/HomePage")
      }

      const nextSlide = () => {
        const newIndex = Math.min(startIndex + 5, Images.length - 1);
        setStartIndex(newIndex);
        setcount(count+1)
      };
    
      const prevSlide = () => {
        const newIndex = Math.max(startIndex - 5, 0);
        setStartIndex(newIndex);
        setcount(count-1)
      };
    
      
      
      const visibleImages = Images.slice(startIndex, startIndex + 5);
  
      const handleImg = (image,index) => {
            setImg(null)
            setImgValue( (count * 5) + index)
            setAvtarValue(true)
      }

      
      
      const handleImgfix = () => {
        setAvtarValue(false)
      }

      console.log(Avtarvalue)


    return(
        <>
        <div className="editProfile">
            <div className="container">
            <div className="left">
                <a className="profile" href="/ProfilePage">
                    <div className="profile-photo">
                    {getData && <img src={getData?.data?.photoURL ?  getData?.data?.photoURL: Images[getData.data.imgValue]} alt=""/>}
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
            
            <div className="profileSection">
                <h1>Edit Profile</h1>
                <div className="EditImg">
                    {Avtarvalue && <img src={Images[imgValue] ? Images[imgValue] :  "https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1" } alt="profileImg"/>}
                    {!Avtarvalue && <img src={img ? URL.createObjectURL(img) :  "https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1"} alt="editImg"/>}
                    <div className="upload-box">
                        <label htmlFor="file">
                        <span class="material-symbols-outlined editspan"  onClick={()=>handleImgfix()}>edit</span>
                        <input type="file" name="file" id="file" accept=".png,.jpeg,.jpg"  style={{ display: "none" }} onChange={(e)=>setImg(e.target.files[0])}/>
                        <p className="errorImg">Insert Image again, Or else it goes empty</p>
                        </label>
                    </div>
                </div>
                <div className="AvtarImgs">
                    <a className="leftarrow"><span class="material-symbols-outlined" style={{fontSize:"300%", marginTop:"2rem", marginLeft:"-3rem"}} onClick={prevSlide} disabled={startIndex === 0}>keyboard_double_arrow_left</span></a>
                    {visibleImages.map((image, index) => (
                      <img key={index} src={image} onClick={(e) =>handleImg(image, index)} alt={`SliderImage ${index}`} />
                    ))}
                    <a className="rightarrow"><span class="material-symbols-outlined" style={{fontSize:"300%"}} onClick={nextSlide} disabled={startIndex + 4 >= Images.length}>keyboard_double_arrow_right</span></a>
                </div>
                <div className="EditForm">
                    <form className="formElements">
                        <label> User Name</label>
                            <input type="text" name="userName" placeholder="" value={data.userName} onChange={handleChange} />
                        
                        <label> Email </label>
                            <input type="email" name="newEmail" placeholder="" value={data.newEmail} onChange={handleChange} />
                       
                        <label> Age </label>
                            <input type="text" name="birthday" placeholder="" value={data.birthday} onChange={handleChange}/>
                        
                        <label> Phone Number </label>
                            <input type="text" name="phoneNumber" placeholder="" value={data.phoneNumber}  onChange={handleChange}/>
                       
                        <label> Bio </label>
                            <input type="text" name="bio" placeholder="" value={data.bio}  onChange={handleChange}/>
                        
                        <label> Portfolio</label>
                            <input type="link" name="portfolio" placeholder="" value={data.portfolio}  onChange={handleChange}/>

                        <label>Old Password</label>
                            <input type="password" name="Oldpassword" placeholder=""  onChange={handleChange}/>
                        <div className="form-btns">
                            <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Save</button>
                            <button className="btn btn-primary" onClick={handleCancel}>Cancel</button>
                        </div>
                        
                        
                    </form>
                </div>
            </div>
           
        </div>
        </>
    )
}