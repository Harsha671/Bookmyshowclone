import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { SearchContext } from "./Searchcontext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Searchbar.css";

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext); // Access context
  const [suggestions, setSuggestions] = useState([]);
  const [issearching, setisSearching] = useState(false)
  const navigate = useNavigate(); // Initialize navigate hook

  const API_KEY = "41c953dc7d1c21d27df7b693e9740a3c";

  const handleSearchInput = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`
        );
        setSuggestions(response.data.results || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally{
        setisSearching(false)
      }
    };

    const debounceFetch = setTimeout(fetchMovies, 500); // Debounce the search
    return () => clearTimeout(debounceFetch);
  }, [searchTerm]);

  // Function to handle click on a suggestion and navigate to MovieDetails
  const handleSuggestionClick = (movieId) => {
    navigate(`/movies/${movieId}`); // Navigate to the movie details page using movie ID
    setSearchTerm(""); // Clear search input after selecting a suggestion
  };

  return (
    <div className="search-container">
        <div className="search-contain">
      <input
        type="text"
        placeholder="Search for Movies, Events, Plays, Sports and Activities"
        className="search-input"
        value={searchTerm}
        onChange={handleSearchInput}
      />
      {searchTerm && (
        <button
          className="clear-button"
          onClick={() => setSearchTerm("")} // Clear the search term
        >
          ✖ 
        </button>
      )}
      </div>
      {issearching && <p className="loading-text">Searching...</p>}
      {!issearching && searchTerm && suggestions.length === 0 && (
        <p className="not-found-text">Movie not found</p>
      )}
      {suggestions.length > 0 && (
        <div className="search-results">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="search-result-item"
              onClick={() => handleSuggestionClick(suggestion.id)} // Use handleSuggestionClick to navigate
            >
              <h4>{suggestion.title}</h4>
              <p>{suggestion.release_date || "Unknown"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;