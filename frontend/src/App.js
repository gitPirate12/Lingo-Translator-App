import './App.css';
import Header from './component/Navbar/Header';

//emoji to text translater


import EmojiText from './component/EmojiText/EmojiText';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
       {/*emoji to text translater*/}
     
        
        <Route path='/emoji_text' element={<EmojiText />} />

       

        </Routes>

      </div>
    </Router>
  );
}

export default App;
