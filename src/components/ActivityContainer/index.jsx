import { useState, useEffect } from "react";
import { useStyles } from "./index.js";
import axios from "axios";

import {
  FormControl,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import Stopwatch from "../Stopwatch/index.jsx";
const ActivityContainer = () => {
  const classes = useStyles();
  const [sports, setSports] = useState([]);
  const [sport, setSport] = useState("");

  const handleChange = (e) => {
    setSport(e.target.value);
  };

  useEffect(() => {
    //let email = localStorage.getItem("Email");
    axios({
      method: "GET",
      url: "https://localhost:7112/api/v1/Sport",
    }).then((res) => {
      console.log(res);
      setSports(res.data);
    });
  }, []);

  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
      <div className={classes.selectPosition}>
        <FormControl variant="outlined" className={classes.formContainer}>
          <InputLabel id="select-label" className={classes.inputLabel}>
            Sport
          </InputLabel>
          <Select
            //labelId="demo-select-small"
            id="select"
            value={sport}
            label="choose sport"
            onChange={handleChange}
            className={classes.select}
          >
            <MenuItem value="">None</MenuItem>
            {sports &&
              sports.map((sportOp) => (
                <MenuItem value={sportOp.name} key={sportOp.name}>
                  {sportOp.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      {/* <div className="stopwatch">
        <div className="numbers">
          <span>{("0" + Math.floor((time / 3600000) % 100)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        </div>
        <div className="buttons">
          <span>
            <Button type="submit">Start</Button>
          </span>
          <Button onClick={() => setRunning(false)}>Stop</Button>
          <Button onClick={() => setTime(0)}>Reset</Button>
        </div>
      </div> */}
      {/* </form> */}

      <Stopwatch sport={sport}></Stopwatch>
    </div>
  );
};
export default ActivityContainer;
