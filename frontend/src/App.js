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
<<<<<<< HEAD

import Login from './component/Auth/Login';
import Signup from './component/Auth/Signup';
=======
>>>>>>> main

function App() {
  return (
    <Router>
      <div>
        { <Navbar /> }
        <Routes>
          {/* {emoji to text translater} */}
          {/* Commenting out the route for AllEmojiText */}
          {/* <Route path='/' element={<AllEmojiText />} /> */}
<<<<<<< HEAD
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
=======
          
>>>>>>> main
          <Route path='/add' element={<Addemoji />} />
          <Route path='emojiText' element={<EmojiText />} />
        </Routes>
      </div>
      {<Footer/>}

    </Router>
  );
}

export default App;
