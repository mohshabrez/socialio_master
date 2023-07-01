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



export function Editprofile(){
    const {currentUser} = UseAuth()
    const[img, setImg] = useState(null)
    const navigate = useNavigate();
    const {stories} = UseMedia()
    const Images=["https://lens-storage.storage.googleapis.com/png/70da173dbc834b4bb6763d61497a247c", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZctKcm1L8v17s92MaieFVgB8fs16dIWM57dcJFb8pA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMnPDKLXy-SPWsPheQfLol1dK8AbOB6zwG0L13lZ2Vg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFtTjGVfyndqQs4bXLI6irHKgXVByWQfogeq700rVsg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TyiRRZgppjo5cmgjSqiJq6zAO_X88bctaHC0VYAhxQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ztZfLq32Qk3F5MCJK4FWSpqREyMbAzE4OKg6Iikowg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPAfuGQCQ44JeIlccF0_BRXUcqA9neAEUToljuGD8NVg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3NeAIgnxIUPIhVmzmi9bti2cTxONWqsWZAzLCOpMMA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKZlYHQHmTr290K_-x2omMfV_Xl4uZHtO7gOgrxKM5pw&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6E1T3Nv6zcK3ZTir7i9OOvlm179rgbaqURNabbX81g&usqp=CAU&ec=48665701",  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3FrjxE6yQQQKp_hLvT_XV39lImu_FBkVqFjTPpKPkeg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUU8CwvrQcAynZHVYTyCcQLVZkaXX921DGp0BRIKu1vA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOLYKINKxHLgMC0KQYHSy9ozTUas4GlH-n1J93EsS2w&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvv7ziu1NxIkQ5WaD1PhtfbaMK18Vicl766BulAg10Q&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4kY52aeKW0wk-eX8HZePpNb73jn9z4s6WKZn6ON8Rg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPKNBy8z42-70ZRp_pcRtKUqvVFrfiaXnhg-1lq6WyQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlXEOQQWYTmsqOwMCjKL--2xoPBaDO5F6b6oV3b3pxqA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5keXx43rQwBatVYjCVkBJQpdQaVCkl3MdDywtCSxBw&usqp=CAU&ec=48665701"] 
    const getData = stories.find((story) => story.id === currentUser.uid)
    const[error, setError] = useState(false)
    const [data, setData] = useState({
        userName:"",
        newEmail:"",
        birthday:"",
        phoneNumber:"",
        bio:"",
        portfolio:"",
        Oldpassword:""
    })

    const handleChange = (e) =>{
        setData((prev) => ({...prev, [e.target.name]: e.target.value}))
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (img) {
          const storageRef = ref(storage, "usersImages/" + uuid());
          const uploadTask = uploadBytesResumable(storageRef, img);
    
          uploadTask.on(
            (error) => {
              setError(true);
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
                  displayName: data.userName,
                  email: data.newEmail,
                  phoneNumber: data.phoneNumber,
                  birthday: data.birthday,
                  bio: data.bio,
                  portfolio: data.portfolio,
                  createdAt: serverTimestamp(),
                });
    
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
    
            displayName: data.userName,
            email: data.newEmail,
            phoneNumber: data.phoneNumber,
            birthday: data.birthday,
            bio: data.bio,
            portfolio: data.portfolio,
            createdAt: serverTimestamp(),
          });
    
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
        navigate("/Login");
      };

      const handleCancel = () => {
        navigate("/HomePage")
      }

    return(
        <>
        <div className="editProfile">
            <div className="container">
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
            
            <div className="profileSection">
                <h1>Edit Profile</h1>
                <div className="EditImg">
                    <img src={img ? URL.createObjectURL(img) : "https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1"} alt="editImg"/>
                    <div className="upload-box">
                        <label htmlFor="file">
                        <span class="material-symbols-outlined editspan">edit</span>
                        <input type="file" name="file" id="file" accept=".png,.jpeg,.jpg"  style={{ display: "none" }} onChange={(e) => setImg(e.target.files[0])}/>
                        </label>
                    </div>
                </div>
                <div className="EditForm">
                    <form className="formElements" onSubmit={handleSubmit}>
                        <label> User Name</label>
                            <input type="text" name="userName" placeholder="" onChange={handleChange} />
                        
                        <label> Email </label>
                            <input type="email" name="newEmail" placeholder=""  onChange={handleChange} />
                       
                        <label> Age </label>
                            <input type="Number" name="birthday" placeholder=""  onChange={handleChange}/>
                        
                        <label> Phone Number </label>
                            <input type="Number" name="phoneNumber" placeholder=""  onChange={handleChange}/>
                       
                        <label> Bio </label>
                            <input type="text" name="bio" placeholder=""  onChange={handleChange}/>
                        
                        <label> Portfolio</label>
                            <input type="link" name="portfolio" placeholder=""  onChange={handleChange}/>

                        <label>Old Password</label>
                            <input type="password" name="Oldpassword" placeholder=""  onChange={handleChange}/>
                        <div className="form-btns">
                            <button className="btn btn-primary" type="submit">Save</button>
                            <button className="btn btn-primary" onClick={handleCancel}>Cancel</button>
                        </div>
                        
                        
                    </form>
                </div>
            </div>
           
        </div>
        </>
    )
}