import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //asyncを関数の前につける、この中でawaitが使える
  async function fetchMoviesHandler() {
    setIsLoading(true);

    //fetchのデフォルトはGETなのでそのままリクエストを送ろう
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    const preparedData = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        release: movieData.release_date,
        openingText: movieData.opening_crawl,
      };
    });

    setMovies(preparedData);
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? <span>Loading</span> : <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
