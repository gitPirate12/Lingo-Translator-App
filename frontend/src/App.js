import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './component/Auth/Register';
import Login from './component/Auth/Login';
import Profile from './component/Profile/Profile';
import UpdateUser from './component/UpdateUser/UpdateUser';
//import Header from './component/Navbar/Header';
import Addemoji from './component/EmojiText/Addemoji';
import AllEmojiText from './component/EmojiText/AllEmojiText';
import EmojiText from './component/EmojiText/EmojiText';

import './App.css';

// emoji to text translater
import Header from './component/Navbar/Header';
import Addemoji from './component/EmojiText/Addemoji';
// import { AllEmojiText } from './component/EmojiText/AllEmojiText';
import EmojiText from './component/EmojiText/EmojiText';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/*emoji to text translater*/}
        {/*  <Route path="/add" element={<Addemoji />} />
          <Route path="/" element={<AllEmojiText />} />
          <Route path="/emojiText" element={<EmojiText />} />
        */}
       
          {/*User Authentication*/}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateUser />} />

        { <Header /> }
        <Routes>
          {/* {emoji to text translater} */}
          {/* Commenting out the route for AllEmojiText */}
          {/* <Route path='/' element={<AllEmojiText />} /> */}
          
          <Route path='/add' element={<Addemoji />} />
          <Route path='emojiText' element={<EmojiText />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
