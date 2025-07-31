import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard"; // 👈 import your reusable component

const HomePage = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/tmdb/clean-fetch")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);

        // Load favorites from localStorage
        const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(stored);
      })
      .catch((err) => {
        console.error("Failed to fetch movies:", err);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (id: number) => {
    let updated = [...favorites];
    if (favorites.includes(id)) {
      updated = updated.filter((favId) => favId !== id);
    } else {
      updated.push(id);
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

 
return (
  <div style={{ padding: "2rem" }}>
    {loading ? (
      <p>Loading movies...</p>
    ) : (
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={{
              id: movie.id,
              title: movie.title,
              overview: movie.overview,
              posterPath: `https://image.tmdb.org/t/p/w200${movie.posterPath}`,
            }}
            onFavoriteToggle={toggleFavorite}
            isFavorited={favorites.includes(movie.id)}
          />
        ))}
      </div>
    )}
  </div>
);
};

export default HomePage;
