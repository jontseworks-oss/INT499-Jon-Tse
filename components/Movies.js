import React, { useState, useEffect } from "react";

function Movies() {
  const [query, setQuery] = useState("");
  
  // Load from LocalStorage on startup
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("movieSearchHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const API_KEY = "b66f6e3a30c78bc2c49e3f7484181d29"; 

  // Save to LocalStorage whenever 'movies' changes
  useEffect(() => {
    localStorage.setItem("movieSearchHistory", JSON.stringify(movies));
  }, [movies]);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Error fetching data from TMDB:", err);
    }
  };

  return (
    <div className="streamlist-container" style={{ maxWidth: "800px" }}>
      <h1>Search Movies</h1>
      
      <form onSubmit={searchMovies} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search for a movie (e.g. Batman)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", 
        gap: "20px" 
      }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ 
            textAlign: "center", 
            background: "#fff", 
            padding: "10px", 
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}>
            <img
              src={movie.poster_path 
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` 
                : 'https://via.placeholder.com/200x300?text=No+Poster'}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "5px" }}
            />
            <p style={{ fontSize: "14px", fontWeight: "bold", marginTop: "10px" }}>
              {movie.title}
            </p>
            <p style={{ fontSize: "12px", color: "#666" }}>
              {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
            </p>
          </div>
        ))}
      </div>
      
      {movies.length === 0 && query && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No movies found. Try another search!</p>
      )}
    </div>
  );
}

export default Movies;
