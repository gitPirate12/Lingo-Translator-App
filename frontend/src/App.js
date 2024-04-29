//Navigation bar
import Navbar from './component/Navbar/Navbar';
//Footer
import Footer from './component/Footer/Footer';
import './component/Footer/FooterApp.css';


// emoji to text translater
import Addemoji from './component/EmojiText/Addemoji';
// import { AllEmojiText } from './component/EmojiText/AllEmojiText';
import EmojiText from './component/EmojiText/EmojiText';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Forum from './component/DisscussionForum/Forum';
import UpdateUser from './component/UpdateUser/UpdateUser';
import Login from './component/Auth/Login';


function App() {
  return (
    <Router>
      <div>
        { <Navbar /> }
        <Routes>
          
          <Route path='/add' element={<Addemoji />} />
          <Route path='emojiText' element={<EmojiText />} />
          <Route path='/Discussion_Forum' element={<Forum />} />
          <Route path='/user-profile' element={<UpdateUser />} />
          <Route path='/logout' element={<Login />} />

        </Routes>
      </div>
      {<Footer/>}

    </Router>
  );
}

export default App;
