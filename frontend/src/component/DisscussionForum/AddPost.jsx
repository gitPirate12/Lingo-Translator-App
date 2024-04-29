import React, { useState } from 'react';
import './AddPost.css';

function AddPost() {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submitting the new post data
    const newPost = {
      question: question,
      // Assuming you already have the user's name from some source
      author: "User's Name" // Replace "User's Name" with the actual name from your schema or source
    };
    console.log(newPost); // Just logging for demonstration
    // You can add logic here to send the new post data to your backend server
    // using Axios or any other method
    // After submitting, you can clear the form field
    setQuestion('');
  };

  return (
    <div className="AddPostContainer">
      <div className="AddPost">
        <h2>Add New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="question">Question:</label>
            <textarea
              id="question"
              className="form-control"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
