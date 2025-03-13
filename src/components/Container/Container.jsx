import "./Container.scss";
import axios from "axios";
import { useState, useEffect } from "react";

function Container() {
  const baseURL = "https://v2.jokeapi.dev";
  const [jokes, setJokes] = useState("");
  const getJokes = async () => {
    try {
      const response = await axios.get(`${baseURL}/joke/any?type=single`);
      setJokes(response.data.joke);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJokes();
  }, []);

  return (
    <div>
      <h1>JOKES GENERATOR (+18)</h1>
      <p>{jokes}</p>
      <button onClick={getJokes}>NEW JOKE</button>
    </div>
  );
}

export default Container;
