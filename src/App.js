import './App.css';
import {Routes, Route} from "react-router-dom"
import { RootLayout } from './Pages/Home/RootLayout';
import { HomePage } from './Pages/Home/HomePage';
import { Feed } from './Pages/Feed/Feed';
import { LoginPage } from './Pages/Login/LoginPage';
import { Signup } from './Pages/Signup/Signup';
import { RequiresAuth } from './Context/RequiresAuth';
import {  ProfilePage } from './Pages/Profile/ProfilePage';
import { Editprofile } from './components/EditProfile/EditProfile';
import { BookMarksPage } from './Pages/BookMarks/BookMarksPage';
import { Explore } from './Pages/Explore/Explore';
import { UserDetails } from './components/UserDetails/UserDetails';




function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/Login" element={<LoginPage/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/UserCreation" element={<UserDetails/>}/>
          <Route path="/" element={<RequiresAuth><RootLayout/></RequiresAuth>}>
          <Route index element={<HomePage />} />
          <Route path="/HomePage" element={<RequiresAuth><HomePage/></RequiresAuth>}/>
          <Route path="/Feed" element={<RequiresAuth><Feed/></RequiresAuth>}/>
          <Route path='/BookMarks' element={<RequiresAuth><BookMarksPage/></RequiresAuth>}/>
          <Route path="/ProfilePage" element={<RequiresAuth><ProfilePage/></RequiresAuth>}/>
          <Route path="/EditProfile" element={<RequiresAuth><Editprofile/></RequiresAuth>}/> 
          <Route path="/Explore" element={<RequiresAuth><Explore/></RequiresAuth>}/> 
        </Route>
      </Routes>
    </div>
  );
}

export default App;