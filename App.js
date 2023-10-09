import React, { useState } from "react";
import "./SnippetManager.css";

const programmingLanguages = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "Ruby",
  "PHP",
  "Swift",
  "TypeScript",
  "Go",
  "Rust",
  "Kotlin",
  "Scala",
  "HTML/CSS",
  "Other"
];

function App() {
  const [snippets, setSnippets] = useState([]);
  const [currentSnippet, setCurrentSnippet] = useState({
    title: "",
    language: "",
    code: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleTitleChange = (e) => {
    setCurrentSnippet({ ...currentSnippet, title: e.target.value });
  };

  const handleLanguageChange = (e) => {
    setCurrentSnippet({ ...currentSnippet, language: e.target.value });
  };

  const handleCodeChange = (e) => {
    setCurrentSnippet({ ...currentSnippet, code: e.target.value });
  };

  const handleAddSnippet = () => {
    if (
      currentSnippet.title &&
      currentSnippet.language &&
      currentSnippet.code
    ) {
      if (editingIndex === -1) {
        setSnippets([...snippets, currentSnippet]);
      } else {
        const updatedSnippets = [...snippets];
        updatedSnippets[editingIndex] = currentSnippet;
        setSnippets(updatedSnippets);
        setEditingIndex(-1);
      }
      setCurrentSnippet({ title: "", language: "", code: "" });
    } else {
      alert("Please provide a title, language, and code.");
    }
  };

  const handleRemoveSnippet = (index) => {
    const updatedSnippets = [...snippets];
    updatedSnippets.splice(index, 1);
    setSnippets(updatedSnippets);
  };

  const handleEditSnippet = (index) => {
    const snippetToEdit = snippets[index];
    setCurrentSnippet(snippetToEdit);
    setEditingIndex(index);
  };

  const filteredSnippets = snippets.filter((snippet) =>
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">Code Snippet Manager</h1>
      <div className="snippet-input">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          className="input-field"
          value={currentSnippet.title}
          onChange={handleTitleChange}
          placeholder="Add a title"
        />
        <label htmlFor="language">Programming Language:</label>
        <select
          id="language"
          className="input-field"
          value={currentSnippet.language}
          onChange={handleLanguageChange}
        >
          <option value="">Select a language</option>
          {programmingLanguages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
        <label htmlFor="code">Code:</label>
        <textarea
          id="code"
          rows="10"
          className="input-field"
          value={currentSnippet.code}
          onChange={handleCodeChange}
        />
        <button className="add-button" onClick={handleAddSnippet}>
          {editingIndex === -1 ? "Add Snippet" : "Update Snippet"}
        </button>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={() => {}} className="search-button">
          Search
        </button>
        <br/>
      </div>
      <div className="snippet-list">
        {filteredSnippets.map((snippet, index) => (
          <div key={index} className="snippet-item">
            <strong>Title:</strong> {snippet.title}
            <br />
            <strong>Language:</strong> {snippet.language}
            <br />
            <strong>Code:</strong>
            <pre className="code-box">{snippet.code}</pre>
            <button
              className="edit-button"
              onClick={() => handleEditSnippet(index)}
            >
              Edit
            </button>
            
            <button
              className="remove-button"
              onClick={() => handleRemoveSnippet(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
