import { UseAuth } from "../../Context/AuthContext"
import { UseMedia } from "../../Context/MediaContext"
import { FollowersCard } from "../../components/FollowersCard/FollowersCard"
import { FriendRequest } from "../../components/FriendRequest/FriendRequest"
import { MessageCategory } from "../../components/MessagesCategory/MessagesCategory"
import {ProfileCard} from "../../components/ProfileCard/ProfileCard"
import "./RightNav.css"
export function RightNav(){
    const {currentUser} = UseAuth();
    const {stories} = UseMedia()

    const filterUsers = stories.filter((user) => user?.data?.uid !== currentUser.uid)

    return(
        <>
        <div className="right">
            <ProfileCard/>
            <div className="followersSection">
            <h4>Connect with New people!!!</h4>
            {filterUsers.map((user) => (
                <FollowersCard key={user.id} user={user} />
                ))
            }
            </div>

            {/* <div className="messages">
                <div className="heading">
                    <h4>Messages</h4><span class="material-symbols-outlined">edit</span>
                </div>
                <div className="search-bar">
                    <span class="material-symbols-outlined">search</span>
                    <input type="search" placeholder="Search Messages" id="message-search"/>
                </div>
                <MessageCategory/>
            </div>
            <FriendRequest/> */}
        </div>
        </>
    )
}