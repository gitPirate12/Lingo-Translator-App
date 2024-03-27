//Navigation bar
import Navbar from './component/Navbar/Navbar';
//Footer
import Footer from './component/Footer/Footer';
import './component/Footer/FooterApp.css';

//import Language translator
import VoiceTrans from './component/Translator/translator'


// emoji to text translater
import Addemoji from './component/EmojiText/Addemoji';
// import { AllEmojiText } from './component/EmojiText/AllEmojiText';
import EmojiText from './component/EmojiText/EmojiText';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        { <Navbar /> }
        <Routes>
          {/* {emoji to text translater} */}
          {/* Commenting out the route for AllEmojiText */}
          {/* <Route path='/' element={<AllEmojiText />} /> */}
          <Route path='/trans' element={<VoiceTrans />} />
          <Route path='/add' element={<Addemoji />} />
          <Route path='emojiText' element={<EmojiText />} />
        </Routes>
      </div>
      {<Footer/>}

    </Router>
  );
}

export default App;
