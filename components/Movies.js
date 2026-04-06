import React, { useState, useEffect } from "react";

function Movies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  
  // Replace 'YOUR_TMDB_API_KEY' with your actual API key from TMDB
  const API_KEY = "YOUR_TMDB_API_KEY"; 

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query) return;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <div className="streamlist-container" style={{ maxWidth: "800px" }}>
      <h1>Search Movies</h1>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "20px", marginTop: "20px" }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ textAlign: "center", background: "#fff", padding: "10px", borderRadius: "8px" }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "5px" }}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'; }}
            />
            <p style={{ fontSize: "14px", fontWeight: "bold" }}>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
