import React, { useState } from 'react';
import axios from 'axios';
import './EmojiText.css';
import Swal from 'sweetalert2'; 

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
      // Use SweetAlert instead of alert
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter only emojis as input.',
      });
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
    <div className="emoji-card">
      <div className="emoji-header">
        Emoji to Text Translator
      </div>
      <div className="emoji-body">
        <textarea
          id="emoji"
          value={emoji}
          onChange={handleInputChange}
          placeholder="Enter emoji here..."
          className="emoji-input"
        />
        <button onClick={handleSearch} className="search-button">Translate</button>
        <div className="meanings-container">
          <div className="meaning-box">
            <div className="meaning-heading">English</div>
            <div className="meaning-content">{meaningEng}</div>
          </div>
          <div className="meaning-box">
            <div className="meaning-heading">Sinhala</div>
            <div className="meaning-content">{meaningSin}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmojiText;
