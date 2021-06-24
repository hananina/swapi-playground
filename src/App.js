import React, { useState, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  //asyncを関数の前につける、この中でawaitが使える
  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);

    try {
      //fetchのデフォルトはGETなのでそのままリクエストを送ろう
      const response = await fetch("https://swapi.dev/api/films/");
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

  //current state によって違ったcontentの中身を設定する
  let content = "Found no movies";

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (isLoading) {
    content = <p>Loading</p>;
  }

  if (error) {
    content = <p>Error</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
