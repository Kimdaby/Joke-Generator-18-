import "./Container.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

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

  const getJokesTwo = async () => {
    try {
      const response = await axios.get(`${baseURL}/joke/any?type=twopart`);
      setJokes(`${response.data.setup} ${response.data.delivery}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJokesTwo();
  }, []);

  return (
    <div>
      <h1>JOKES GENERATOR (+18)</h1>
      <div>
        <Checkbox {...label} defaultChecked />
        <Checkbox {...label} defaultChecked color="secondary" />
        <Checkbox {...label} defaultChecked color="success" />
        <Checkbox {...label} defaultChecked color="default" />
        <Checkbox
          {...label}
          defaultChecked
          sx={{
            color: pink[800],
            "&.Mui-checked": {
              color: pink[600],
            },
          }}
        />
      </div>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={getJokes}>One Liner</Button>
        <Button onClick={getJokesTwo}>Two Liner</Button>
      </ButtonGroup>
      <p>{jokes}</p>
    </div>
  );
}

export default Container;
