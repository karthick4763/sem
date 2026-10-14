
import { useState } from "react";

function App() {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState([]);

  async function searchMovie() {
    const res = await fetch(
      `https://api.tvmaze.com/search/shows?q=${movie}`
    );

    const data = await res.json();
    setMovies(data);
  }

  return (
    <div>
      <h1>Movie Search</h1>

      <input
        type="text"
        placeholder="Enter movie name"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
      />

      <button onClick={searchMovie}>Search</button>

      {movies.map((item) => (
        <div key={item.show.id}>
          <h2>{item.show.name}</h2>

          <p>Language: {item.show.language}</p>

          <p>Status: {item.show.status}</p>

          <p>Rating: {item.show.rating.average}</p>

          {item.show.image && (
            <img
              src={item.show.image.medium}
              alt={item.show.name}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
