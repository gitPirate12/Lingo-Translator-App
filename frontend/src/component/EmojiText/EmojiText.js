import React, { useState } from 'react';
import axios from 'axios';

function EmojiText() {
  const [emoji, setEmojiInput] = useState('');
  const [meaningEng, setEmojiMeaningEng] = useState('');
  const [meaningSin, setEmojiMeaningSin] = useState('');

 


  const handleInputChange = (e) => {
    setEmojiInput(e.target.value);
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
    <div className="App">
      <h1>Emoji Translator</h1>
      <label htmlFor="emoji">Enter Emoji: </label>
      <input
        type="text"
        id="emoji"
        value={emoji}
        onChange={handleInputChange}
        placeholder="Search emoji"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        <strong>Meaning: </strong>
        {meaningEng}
      </div>

      <div>
        <strong>Meaning: </strong>
        {meaningSin}
      </div>

    </div>
  );
}

export default EmojiText;
