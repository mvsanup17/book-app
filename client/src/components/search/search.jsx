import React, { useState } from 'react';
import './search.css';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/search?q=${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Fetch error:", error.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setResults([]);
    }
  };

  return (
    <div className="search-container">
      <h1>📚 Book Finder</h1>
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Search for books..." 
          value={query}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>🔍 Search</button>
      </div>

      {loading && <p className="loading-text">Loading...</p>}

      <div className="results">
        {results.length > 0 ? (
          results.map((book, index) => (
            <div key={index} className="book-card">
              <img src={book.image} alt={book.title} />
              <div className="book-info">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p className="description">{book.description}</p>
                <a href={book.link} target="_blank" rel="noopener noreferrer">📖 More Info</a>
              </div>
            </div>
          ))
        ) : (
          query && !loading && <p className="no-results">No books found. Try another search!</p>
        )}
      </div>
    </div>
  );
}

export default Search;
