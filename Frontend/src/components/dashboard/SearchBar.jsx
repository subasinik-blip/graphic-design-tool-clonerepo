import React, { useRef, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

// Images
import Poster from "../../assets/Search-Images/Poster.jpg";
import Business_cars from "../../assets/Search-Images/Business_cars.jpg";
import PresentationSearch from "../../assets/Search-Images/Presentation.jpg";
import Custom from "../../assets/Search-Images/Custom.jpg";
import Wedding from "../../assets/Search-Images/Wedding.jpg";
import Happy_Birthday from "../../assets/Search-Images/Happy_Birthday.jpg";
import Business from "../../assets/Search-Images/Business.jpg";
import Resume from "../../assets/Search-Images/Resume.jpg";

const suggestedSizes = [
  { name: "Poster", image: Poster },
  { name: "Business Cards", image: Business_cars },
  { name: "Presentation", image: PresentationSearch },
  { name: "Custom", image: Custom },
];

const recomendedSearches = [
  { name: "Wedding", image: Wedding },
  { name: "Happy_Birthday", image: Happy_Birthday },
  { name: "Business", image: Business },
  { name: "Resume", image: Resume },
];

export default function SearchBar({ token }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch search results from backend
 useEffect(() => {
  if (!query.trim()) {
    setResults([]);
    return;
  }

  if (typingTimeoutRef.current) {
    clearTimeout(typingTimeoutRef.current);
  }

  typingTimeoutRef.current = setTimeout(async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/search", {
        params: { q: query },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success && response.data.results.length > 0) {
        setResults(response.data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    }
  }, 400); // smoother search
}, [query, token]);

  return (
    <div
      className={`search-wrapper ${showDropdown ? "active" : ""}`}
      ref={searchRef}
    >
      <div className="search-box" onClick={() => setShowDropdown(true)}>
        <div className="search-icon">
          <FiSearch />
        </div>
        <input
          type="text"
          placeholder="Search templates, sizes, or projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
        />
      </div>

      {showDropdown && (
  <div className="search-dropdown">

    {/* When user is typing */}
    {query.trim() ? (
      <>
        <h4>Search Results</h4>

        {results.length > 0 ? (
          <div className="results-grid">
            {results.map((item) => (
              <div className="result-card" key={item.id}>
                <strong>{item.title}</strong>
                <p>{item.category} - {item.type}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-results">
            No results found for "<strong>{query}</strong>"
          </p>
        )}
      </>
    ) : (
      <>
        {/* Default dropdown when search is empty */}

        <div className="search-links">
          <div className="search-link">
            <span>In</span> Search within folders or teams
          </div>
          <div className="search-link">
            <span>By</span> Search by owner
          </div>
          <div className="search-link">
            <span>Type</span> Filter by file type
          </div>
          <div className="search-link">
            <span>Category</span> Filter by content category
          </div>
        </div>

        <h4>Suggested Sizes</h4>
        <div className="suggested-grid">
          {suggestedSizes.map((item) => (
            <div className="suggest-card" key={item.name}>
              <img src={item.image} alt={item.name} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        <h4>Recommended Searches</h4>
        <div className="suggested-grid">
          {recomendedSearches.map((item) => (
            <div className="suggest-card" key={item.name}>
              <img src={item.image} alt={item.name} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </>
    )}

  </div>
)}
    </div>
  );
}