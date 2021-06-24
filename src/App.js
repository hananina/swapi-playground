import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //asyncを関数の前につける、この中でawaitが使える
  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);

    try {
      //fetchのデフォルトはGETなのでそのままリクエストを送ろう
      const response = await fetch("https://swapi.dev/api/film/");
      if (!response.ok) {
        throw new Error("エラーが出てるよ"); //エラーを投げたのでtryの下のブロックはスキップして、catchブロックへ飛ぶ。
      }
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
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  let content = "Found no movies";

  if (isLoading) {
    content = "Loading";
  }

  if (error) {
    content = "Error";
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <span>{content}</span>}
        {!isLoading && error && <p>{content}</p>}
        {!isLoading && !error && movies.length === 0 && <p>{content}</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
