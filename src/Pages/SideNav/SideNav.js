import "./SideNav.css"
import { Notifications } from "../../components/Notifications/Notifications";
import { Theme } from "../../components/Theme/Theme";
import { Link, useNavigate } from "react-router-dom";
import { UseBook } from "../../Context/BookContext";
import { toast } from "react-toastify";

export function SideNav(){
    const navigate = useNavigate()
    const {BookMarks} = UseBook()


    const handleBookMark = () => {
        navigate("/BookMarks", {state: BookMarks})
    }

    return(
        <div className="left">
            <p className="designer">Designed by <a style={{color:"hsl(252, 75%, 60%)"}} href="https://shabrezs-port.netlify.app/" target="_blank" rel="noreferrer">Shabrez</a></p>
        <div className="sidebar">
            <a className="menu-item" href="/HomePage">
                <span class="material-symbols-outlined">home</span><h3>Home</h3>
            </a>
            <a className="menu-item " href="/Explore">
                <span class="material-symbols-outlined">explore</span><h3>Explore</h3>
            </a>
            <a className="menu-item " id="notifications" onClick={()=>toast.info("Inprogress Feautre development")}>
                <span   span class="material-symbols-outlined"><small className="notification-count">9+</small>notifications</span><h3>Notifications</h3>
                <div className="notifyBar">
                    <Notifications/>
                </div>
            
            </a>
            <a className="menu-item "  id="messages-notifications" onClick={()=>toast.info("Inprogress Feautre development")}>
                <span class="material-symbols-outlined"><small className="notification-count">6</small>chat</span><h3>Chat</h3>
            </a>
            <a className="menu-item " onClick={()=> handleBookMark()}>
                
                <span class="material-symbols-outlined">bookmark</span> <h3>Bookmark</h3>
                
            </a>
            <a className="menu-item " onClick={()=>toast.info("Inprogress Feautre development")}>
                <span class="material-symbols-outlined">monitoring</span><h3>Analytics</h3>
            </a>
        <a className="menu-item " onClick={()=>toast.info("Inprogress Feautre development")}>
            <span class="material-symbols-outlined">palette</span><h3>Theme</h3>
            <div className="theme-card">
                <Theme/>
            </div>
        </a>
        <a className="menu-item " onClick={()=>toast.info("Inprogress Feautre development")}>
            <span class="material-symbols-outlined">settings</span><h3>Settings</h3>
        </a>
        </div>
         {/* end */}
         <label for="create-post" className="btn btn-primary" onClick={()=>toast.info("Feautre is still inprogress of development")}>Post</label>
        </div>
    )
}