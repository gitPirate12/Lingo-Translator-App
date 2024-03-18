

//Navigation bar
import Navbar from './component/Navbar/Navbar';
//Footer
import Footer from './component/Footer/Footer';
import './component/Footer/FooterApp.css';
import Addemoji from './component/EmojiText/Addemoji';
import EmojiText from './component/EmojiText/EmojiText';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './component/EmojiText/Header';

function App() {
  return (
    <Router>
      <div>
        { <Navbar /> }
        <Routes>
          <Route path='/addEmoji' element={<Addemoji />} />
          <Route path='/emojiText' element={<EmojiText />} />
        </Routes>
      </div>
      {<Footer/>}

    </Router>
  );
}

export default App;
