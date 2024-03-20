import './App.css';

// emoji to text translater
//import Header from './component/Navbar/Header';
import Addemoji from './component/EmojiText/Addemoji';
// import { AllEmojiText } from './component/EmojiText/AllEmojiText';
import EmojiText from './component/EmojiText/EmojiText';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import DiscussionForum from './component/DiscussionForum/DiscussionForum';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from './component/Footer/Footer'
import Profile from './component/Profile/Profile'
import Dashboard from './component/Profile/Dashboard';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* {emoji to text translater} */}
          {/* Commenting out the route for AllEmojiText */}
          {/* <Route path='/' element={<AllEmojiText />} /> */}
          <Route path='/Discussion_Forum' element={<DiscussionForum/>}/>
          <Route path='/add' element={<Addemoji />} />
          <Route path='emojiText' element={<EmojiText />} />
          
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='profile' element={<Profile/>}/>
          <Route path="/dashboard" component={<Dashboard/>}/>

          <Route path='/footer' element={<Footer />} />          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
