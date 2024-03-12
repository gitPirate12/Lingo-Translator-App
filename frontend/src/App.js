import './App.css';
import Header from './component/Navbar/Header';

//emoji to text translater


import EmojiText from './component/EmojiText/EmojiText';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//emoji to text translater
import Header from './component/Navbar/Header';
import Addemoji from './component/EmojiText/Addemoji';
import { AllEmojiText } from './component/EmojiText/AllEmojiText';
import EmojiText from './component/EmojiText/EmojiText'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
       {/*emoji to text translater*/}
     
        
        <Route path='/add' element={<Addemoji />} />
        <Route path='/' element={<AllEmojiText />} />
        <Route path='emojiText' element={<EmojiText />} />

       

        </Routes>

      </div>
    </Router>
  );
}

export default App;
