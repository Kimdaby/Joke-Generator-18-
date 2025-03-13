import "./Container.scss";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Switch from "@mui/material/Switch";
import { pink } from "@mui/material/colors";
import { alpha, styled } from "@mui/material/styles";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

function Container() {
  const baseURL = "https://v2.jokeapi.dev";
  const [jokes, setJokes] = useState("");
  const [blacklist, setBlacklist] = useState({
    nsfw: false,
    religious: false,
    political: false,
    racist: false,
    sexist: false,
    explicit: false,
  });

  const handleBlacklistChange = (category) => {
    setBlacklist((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getBlacklistQuery = () => {
    const activeBlacklist = Object.keys(blacklist)
      .filter((key) => blacklist[key])
      .join(",");
    return activeBlacklist ? `&blacklistFlags=${activeBlacklist}` : "";
  };

  const getJokes = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/joke/Any?type=single${getBlacklistQuery()}`
      );
      setJokes(response.data.joke);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  const getJokesTwo = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/joke/Any?type=twopart${getBlacklistQuery()}`
      );
      setJokes(`${response.data.setup} ${response.data.delivery}`);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  useEffect(() => {
    getJokes();
  }, []);

  const hasAlerted = useRef(false);

  useEffect(() => {
    if (!hasAlerted.current) {
      alert("if !18+ Enter at your own risk");
      hasAlerted.current = true;
    }
  }, []);

  return (
    <div className="container">
      <h1>JOKES GENERATOR (+18)</h1>
      <div>
        <img src="src\assets\images\kevin.png" />
      </div>
      <div>BLACKLIST SWITCH (flip switch to remove a certain category)</div>
      <div className="switch">
        <label>NSFW</label>
        <PinkSwitch
          checked={blacklist.nsfw}
          onChange={() => handleBlacklistChange("nsfw")}
        />

        <label>Religious</label>
        <PinkSwitch
          checked={blacklist.religious}
          onChange={() => handleBlacklistChange("religious")}
        />

        <label>Political</label>
        <PinkSwitch
          checked={blacklist.political}
          onChange={() => handleBlacklistChange("political")}
        />

        <label>Racist</label>
        <PinkSwitch
          checked={blacklist.racist}
          onChange={() => handleBlacklistChange("racist")}
        />

        <label>Sexist</label>
        <PinkSwitch
          checked={blacklist.sexist}
          onChange={() => handleBlacklistChange("sexist")}
        />

        <label>Explicit</label>
        <PinkSwitch
          checked={blacklist.explicit}
          onChange={() => handleBlacklistChange("explicit")}
        />
      </div>

      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={getJokes} color="secondary">
          One Liner
        </Button>
        <Button onClick={getJokesTwo} color="secondary">
          Two Liner
        </Button>
      </ButtonGroup>

      <div className="joke">
        <p>{jokes}</p>
      </div>
    </div>
  );
}

export default Container;
