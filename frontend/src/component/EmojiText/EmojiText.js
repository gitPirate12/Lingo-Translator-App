import React, { useState } from 'react';
import axios from 'axios';
import './EmojiText.css'; // Import the CSS file for styling

function EmojiText() {
  const [emoji, setEmojiInput] = useState('');
  const [meaningEng, setEmojiMeaningEng] = useState('');
  const [meaningSin, setEmojiMeaningSin] = useState('');

  const handleInputChange = (e) => {
    const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    const input = e.target.value;
    if (input === '' || emojiRegex.test(input)) {
      setEmojiInput(input);
    } else {
      // Notify the user that only emojis are allowed
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
      <h1 className="title">Emoji Translator</h1>
      <div className="search-container">
        <label htmlFor="emoji" className="input-label">Enter Emoji: </label>
        <input
          type="text"
          id="emoji"
          value={emoji}
          onChange={handleInputChange}
          placeholder="Search emoji"
          className="emoji-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      <div className="meaning-container">
        <div className="meaning-section">
          <strong className="meaning-heading">English: </strong>
          <div className="meaning-content">{meaningEng}</div>
        </div>
        <div className="meaning-section">
          <strong className="meaning-heading">Meaning: </strong>
          <div className="meaning-content">{meaningSin}</div>
        </div>
      </div>
    </div>
  );
}

export default EmojiText;
