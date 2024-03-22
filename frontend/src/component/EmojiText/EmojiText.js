import React, { useState } from 'react';
import axios from 'axios';
import './EmojiText.css'; // Import the CSS file for styling

function EmojiText() {
  const [emoji, setEmojiInput] = useState('');
  const [meaningEng, setEmojiMeaningEng] = useState('');
  const [meaningSin, setEmojiMeaningSin] = useState('');

  const handleInputChange = (e) => {
    const emojiValidate = /^[^\p{L}\p{N}]*$/u;
    const input = e.target.value;
  
    if (emojiValidate.test(input)) {
      setEmojiInput(input);
    } else {
      alert('Please enter only emojis as input.');
    }
  };
  

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3040/emoji/search/${encodeURIComponent(emoji)}`);
      setEmojiMeaningEng(response.data.meaningEng);
      setEmojiMeaningSin(response.data.meaningSin);
    } catch (error) {
      console.error('Error searching emoji:', error.message);
      setEmojiMeaningEng('Error searching emoji');
      setEmojiMeaningSin('Error searching emoji');
    }
  };
  return (
    <div className="emoji-container">
      {/* <h1 className="title"></h1> */}
      <div className="search-container">
        <input
          type="text"
          id="emoji"
          value={emoji}
          onChange={handleInputChange}
          placeholder="Search Emoji Here"
          className="emoji-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
<div className="meaning-container">
        <div className="meaning-section">
          <div className="meaning-heading">English: </div>
          <div className="meaning-content">{meaningEng}</div>
        </div>
        <div className="meaning-section">
          <div className="meaning-heading">Sinhala: </div>
          <div       className="meaning-content">{meaningSin}</div>
        </div>
      </div>
    </div>
  );
}

export default EmojiText;