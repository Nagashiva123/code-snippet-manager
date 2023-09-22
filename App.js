import React, { useState } from 'react';
import './App.css'; // Import your CSS stylesheet

function App() {
  const [snippets, setSnippets] = useState([]);
  const [currentSnippet, setCurrentSnippet] = useState({ language: '', code: '' });

  const handleLanguageChange = (e) => {
    setCurrentSnippet({ ...currentSnippet, language: e.target.value });
  };

  const handleCodeChange = (e) => {
    setCurrentSnippet({ ...currentSnippet, code: e.target.value });
  };

  const handleAddSnippet = () => {
    if (currentSnippet.language && currentSnippet.code) {
      setSnippets([...snippets, currentSnippet]);
      setCurrentSnippet({ language: '', code: '' });
    } else {
      alert('Please provide both language and code.');
    }
  };

  const handleRemoveSnippet = (index) => {
    const updatedSnippets = [...snippets];
    updatedSnippets.splice(index, 1);
    setSnippets(updatedSnippets);
  };

  return (
    <div className="container">
      <h1>Snippet Code Manager</h1>
      <div>
        <label htmlFor="language">Programming Language:</label>
        <input
          type="text"
          id="language"
          className="input-field"
          value={currentSnippet.language}
          onChange={handleLanguageChange}
        />
      </div>
      <div>
        <label htmlFor="code">Code:</label>
        <textarea
          id="code"
          rows="5"
          className="input-field"
          value={currentSnippet.code}
          onChange={handleCodeChange}
        />
      </div>
      <button className="add-button" onClick={handleAddSnippet}>Add Snippet</button>
      <div>
        <h2>Snippets:</h2>
        <ul className="snippet-list">
          {snippets.map((snippet, index) => (
            <li key={index} className="snippet-item">
              <strong>Language:</strong> {snippet.language}<br />
              <strong>Code:</strong> {snippet.code}
              <button className="remove-button" onClick={() => handleRemoveSnippet(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
