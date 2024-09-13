import React, { useEffect, useState } from 'react';
import './App.css';  

function App() {
  const [characters, setCharacters] = useState([]);
  const [quote, setQuote] = useState(null);
  const [showCharacters, setShowCharacters] = useState(false);
  const [newCharacter, setNewCharacter] = useState(''); 
  const [source, setSource] = useState(''); 

  
  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://api.sampleapis.com/simpsons/characters');
      const data = await response.json();
      setCharacters(data);
      setSource('Source: Sample APIs (Characters)');
    } catch (err) {
      console.error("Error fetching characters:", err);
    }
  };


  const fetchQuote = async () => {
    try {
      const response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
      const data = await response.json();
      setQuote(data[0]);
      setSource('Source: Glitch API (Quotes)');
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  };

  
  const handleShowCharacters = () => {
    setShowCharacters(true);
    fetchCharacters();
  };

  
  const handleShowQuote = () => {
    setShowCharacters(false);
    fetchQuote();
  };

  
  const handleAddCharacter = () => {
    if (newCharacter.trim()) {
      const newChar = { id: characters.length + 1, name: newCharacter, normalized_name: newCharacter.toLowerCase(), gender: '' };
      setCharacters([newChar, ...characters]); 
      setNewCharacter(''); 
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">The Simpsons App</h1>
      <div className="button-container">
        <button onClick={handleShowCharacters} className="app-button">Simpsons 1 - Characters</button>
        <button onClick={handleShowQuote} className="app-button">Simpsons 2 - Random Quote</button>
      </div>

      <p className="source-info">{source}</p>

      {}
      {showCharacters ? (
        <div className="characters-container">
          <h2>Characters</h2>
          <input
            type="text"
            placeholder="Add new character"
            value={newCharacter}
            onChange={(e) => setNewCharacter(e.target.value)}
            className="character-input"
          />
          <button onClick={handleAddCharacter} className="add-button">Add Character</button>
          <ul className="character-list">
            {characters.map((character) => (
              <li key={character.id} className="character-item">{character.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="quote-container">
          <h2>Random Quote</h2>
          {quote ? (
            <div className="quote-content">
              <p><strong>{quote.character}:</strong> {quote.quote}</p>
              <img src={quote.image} alt={quote.character} className="quote-image" />
            </div>
          ) : (
            <p>Loading quote...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
