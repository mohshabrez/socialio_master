import "./MessagesCategory.css"
export function MessageCategory(){
    return(
        <>
        <div className="category">
            <h6 className="active">Primary</h6>
            <h6>General</h6>
            <h6 className="message-requests">Requests(2)</h6>
        </div>
        <div className="message">
            <div className="profile-photo">
                <img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1" alt="message-img" />
                <div className="active"></div>
            </div>
            <div className="message-body">
                <h5>Profile1</h5>
                <p className="text-muted">Just woke up bruh</p>
                
            </div>
        </div>
        <div className="message">
            <div className="profile-photo">
                <img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1" alt="message-img" />
                <div className="active"></div>
            </div>
            <div className="message-body">
                <h5>Profile1</h5>
                <p className="text-bold">2 New Messages</p>
                
            </div>
        </div>
        <div className="message">
            <div className="profile-photo">
                <img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1" alt="message-img" />
            </div>
            <div className="message-body">
                <h5>Profile1</h5>
                <p className="text-muted">Just woke up bruh</p>
            </div>
        </div>
        <div className="message">
            <div className="profile-photo">
                <img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1" alt="message-img" />
            </div>
            <div className="message-body">
                <h5>Profile1</h5>
                <p className="text-muted">Just woke up bruh</p>
            </div>
        </div>
        <div className="message">
            <div className="profile-photo">
                <img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1" alt="message-img" />
            </div>
            <div className="message-body">
                <h5>Profile1</h5>
                <p className="text-bold">Just woke up bruh</p>
            </div>
        </div>
        </>
    )
}