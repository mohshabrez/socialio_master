import { useLocation, useNavigate } from "react-router-dom"
import iphone from "../../Images/iphone.png"
import "./UserDetails.css"
import { useState } from "react"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { auth, storage }  from "../../config/firebase"
import { toast } from "react-toastify"

export function UserDetails(){
    const Images=["https://lens-storage.storage.googleapis.com/png/70da173dbc834b4bb6763d61497a247c", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZctKcm1L8v17s92MaieFVgB8fs16dIWM57dcJFb8pA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMnPDKLXy-SPWsPheQfLol1dK8AbOB6zwG0L13lZ2Vg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXFtTjGVfyndqQs4bXLI6irHKgXVByWQfogeq700rVsg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TyiRRZgppjo5cmgjSqiJq6zAO_X88bctaHC0VYAhxQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ztZfLq32Qk3F5MCJK4FWSpqREyMbAzE4OKg6Iikowg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPAfuGQCQ44JeIlccF0_BRXUcqA9neAEUToljuGD8NVg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc3NeAIgnxIUPIhVmzmi9bti2cTxONWqsWZAzLCOpMMA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKZlYHQHmTr290K_-x2omMfV_Xl4uZHtO7gOgrxKM5pw&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6E1T3Nv6zcK3ZTir7i9OOvlm179rgbaqURNabbX81g&usqp=CAU&ec=48665701",  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3FrjxE6yQQQKp_hLvT_XV39lImu_FBkVqFjTPpKPkeg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUU8CwvrQcAynZHVYTyCcQLVZkaXX921DGp0BRIKu1vA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOLYKINKxHLgMC0KQYHSy9ozTUas4GlH-n1J93EsS2w&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvv7ziu1NxIkQ5WaD1PhtfbaMK18Vicl766BulAg10Q&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4kY52aeKW0wk-eX8HZePpNb73jn9z4s6WKZn6ON8Rg&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPKNBy8z42-70ZRp_pcRtKUqvVFrfiaXnhg-1lq6WyQ&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlXEOQQWYTmsqOwMCjKL--2xoPBaDO5F6b6oV3b3pxqA&usqp=CAU&ec=48665701", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5keXx43rQwBatVYjCVkBJQpdQaVCkl3MdDywtCSxBw&usqp=CAU&ec=48665701"]
    const [img, setImg] = useState("")
    const[indiImg, setIndiImg] = useState("")
    const[imgValue, setImgValue] = useState(1)
    const[userName, setUserName] = useState("")
    const[bio, setBio] = useState("")
    const[birthday, setBirthday] = useState("")
    const[portfolio, setPortfolio] = useState("")
    const[phoneNumber, setPhoneNumber] = useState('')
    const [startIndex, setStartIndex] = useState(0);
    const[count, setcount] = useState(0)
    const[error, setError] = useState('')
    const[Avtarvalue, setAvtarValue] = useState(false)
    const[isButtonDisabled, setIsButtonDisabled] = useState(false)
    const[userPassword, setPassword] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const user = location.state.singUpValues




    let displayName = user.displayName;
    let email = user.Email;
    let password = user.Pswrd;
 

    setTimeout(() => {
        setIsButtonDisabled(userName === '' && bio === '' && birthday === '' && portfolio === '' && phoneNumber=== '' )
      }, 2000);

      console.log(isButtonDisabled)
    
    const handleRegister= async (e) => {
                e.preventDefault()

                if(indiImg){
                    try{
                        const res = await createUserWithEmailAndPassword(auth, email, password)
                        
                        const storageRef = ref(storage, "usersImages/" +  displayName);
            
                        const uploadTask = uploadBytesResumable(storageRef, indiImg);
            
                        uploadTask.on('state_changed',
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
                // Upload completed successfully, now we can get the download URL
                try{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        updateProfile(res.user, {
                            displayName, 
                            photoURL: downloadURL,
                         });             
                  
                      setDoc(doc(db, "users", res.user.uid), {
                         uid: res.user.uid,
                         displayName,
                         email,
                         photoURL: downloadURL,
                         username: userName,
                         bio: bio,
                         birthday: birthday,
                         phoneNumber: phoneNumber,
                         portfolio: portfolio,
                         handleAvatar: imgValue
                         });
            
                      setDoc(doc(db, "usersPosts", res.user.uid), {messages:[]})    
                      }); 
                      navigate("/Login")   
                }
                catch(error){
                    console.log(error.message)
                    toast.error("EMAIL ALREADY INUSE")
                }    
                });
              }
             catch(error){
                 console.log(error.message)
                setError(true)
                }
                    
        }
        else{
            try{
                const res = await createUserWithEmailAndPassword(auth, email, password)
                        
            updateProfile(res.user, {
                displayName, 
                
             });             
      
          setDoc(doc(db, "users", res.user.uid), {
             uid: res.user.uid,
             displayName,
             email,
             userName,
             bio,
             birthday,
             phoneNumber,
             portfolio,
             imgValue
             });

            setDoc(doc(db, "usersPosts", res.user.uid), {messages:[]})     
            
            navigate("/Login")  
            }
            catch(error){
                setError(true)
                toast.error("EMAIL ALREADY INUSE")
            }
            
                    
        }
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
            setImgValue( (count * 5) + index)
            setAvtarValue(true)
            
      }

      const handleImgfix = () => {
        setAvtarValue(false)
      }
      
      const handleCancel = () => {
        navigate("/Signup")
      }

    return(
        <>
        <div className="UserDesign">
            <div className="iphoneshow">
                <img src={iphone} alt="iphoneImg" />
                <div className="userprofile">
                    <img className="bg-img" src="https://static.wixstatic.com/media/c2cda0_ccf77c82f1ad463a82fcb49f9ed3b6da~mv2.png/v1/fit/w_1000,h_600,al_c,q_80/file.png" alt="coverImg" />
                    {Avtarvalue && <img className="profImg" src={Images[imgValue] ? Images[imgValue] :  "https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1" } alt="profileImg"/>}
                    {!Avtarvalue && <img className="profImg" src={indiImg ? URL.createObjectURL(indiImg) :  "https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1"} alt="editImg"/>}
                </div>
                <div className="profileInfo">
                    <h1>{userName}</h1>
                    <h3>{bio}</h3>
                    <h4>{birthday ?  `Age:${birthday}` : ""}</h4>
                    <h4 className="phno">{phoneNumber ? `Phno:${phoneNumber}`:""}</h4>
                    <p>{portfolio}</p>
                </div>
            </div>
            <div className="createProfile">
                <h1>Create Profile</h1>
                <h3>Enter your Personal Details and create a bio by selecting Avatars</h3>
                <div className="AvtarImgs">
               <a className="leftarrow"><span class="material-symbols-outlined" style={{fontSize:"300%", marginTop:"2rem", marginLeft:"-3rem"}} onClick={prevSlide} disabled={startIndex === 0}>keyboard_double_arrow_left</span></a>
      {visibleImages.map((image, index) => (
        <img key={index} src={image} onClick={(e) =>handleImg(image, index)} alt={`SliderImage ${index}`} />
      ))}
      <a className="rightarrow"><span class="material-symbols-outlined" style={{fontSize:"300%"}} onClick={nextSlide} disabled={startIndex + 4 >= Images.length}>keyboard_double_arrow_right</span></a>
                </div>
                <div className="EditImg">
                    <div className="upload-box">
                        <label htmlFor="file" className="upload-label"  onClick={()=>handleImgfix()}>Upload Image Manually
                        <a className="upload-file"><span class="material-symbols-outlined" style={{ }}>drive_folder_upload</span></a>
                        <input type="file" name="file" id="file" accept=".png,.jpeg,.jpg"  style={{ display:"none"  }} onChange={(e) => setIndiImg(e.target.files[0])}/>
                        </label>
                    </div>
                </div>
                <div className="UserForm">
                    <form className="userFormElements">
                        <label> User Name</label>
                            <input type="text" name="userName" placeholder="" required onChange={(e) => setUserName(e.target.value)} />

                        <label style={{position:"relative", left:"50%", top:"-5rem"}}> AGE </label>
                            <input type="number" name="age" placeholder=""  required  style={{position:"relative", left:"50%", top:"-5rem"}} onChange={(e) => setBirthday(e.target.value)}/>
                        
                        <label style={{position:"relative", top:"-4rem"}}> Bio </label>
                            <input type="text" name="bio" placeholder=""  required  style={{position:"relative", top:"-4rem"}} onChange={(e) => setBio(e.target.value)} />
                        
                        <label style={{position:"relative", left:"50%", top:"-9rem"}}> Portfolio</label>
                            <input type="link" name="portfolio" placeholder=""  required  style={{position:"relative", left:"50%", top:"-9rem"}} onChange={(e) => setPortfolio(e.target.value)} />
                        
                        <label style={{position:"relative", top:"-8rem"}}> Phone Number </label>
                            <input type="Number" name="phoneNumber" placeholder=""  required  style={{position:"relative", top:"-8rem"}} onChange={(e) => setPhoneNumber(e.target.value)}/>
                       
                        <label style={{position:"relative", left:"50%", top:"-13rem"}}>Password</label>
                            <input type="password" name="Oldpassword" placeholder=""  required  style={{position:"relative", left:"50%", top:"-13rem"}} onChange={(e) => setPassword(e.target.value)} />
                        <div className="formbtns" >
                            <button className="btn btn-primary" type="submit" disabled={isButtonDisabled}  onClick={handleRegister}>Save</button>
                            <button className="btn btn-primary" onClick={handleCancel}>Cancel</button>
                        </div>
                        {isButtonDisabled && <p className="formerrorr">Please fill or check the above fields</p> } 
                    </form>
                </div>
            </div>
           
            </div>
        </>
    )
}