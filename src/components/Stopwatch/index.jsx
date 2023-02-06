import { useStyles } from "./index.js";
import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import RenderingMap from "../RenderingMap/index.jsx";
import { VscDebugStart } from "react-icons/vsc";
import { RxPause, RxStop, RxResume } from "react-icons/rx";

const Stopwatch = (props) => {
  const classes = useStyles();
  //  time/1000 = timpul total in secunde !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [coordonates, setCoordonates] = useState([]);
  //status=0 - not started
  //status=1 - in progress
  //status=2 - paused
  //status=3 - finished
  const [status, setStatus] = useState(0);
  //const sport = props.sports;

  function computeSpeed(time, distance) {
    if (distance === 0) return 0;
    let computedSpeed = (100 * ((distance / time) * (18 / 5))) / 1;
    return Math.floor(computedSpeed) / 100;
  }
  function CreateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  const pull_data = (data) => {
    setDistance(data);
    let s = computeSpeed(time, data);
    setSpeed(s);
  };

  const pull_coords = (data) => {
    if (status === 1) {
      let points = [];
      console.log(data);
      if (data !== []) {
        data.forEach((element) => {
          let guid = CreateGUID();
          let point = {
            id: guid,
            latitude: element.lat,
            longitude: element.lng,
          };
          points.push(point);
        });
        setCoordonates(points);
        let s = computeSpeed(time, data);
        setSpeed(s);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(props.sport);
    if (props.sport !== "") {
      axios({
        method: "POST",
        url: "https://localhost:7112/api/v1/Activity",
        data: {
          startDate: new Date(),
          duration: 0,
          distance: 0,
          elevationGain: 0,
          elevationLoss: 0,
          calories: 0,
          inProgress: true,
          sportName: props.sport,
          userEmail: localStorage.getItem("Email"),
        },
      }).then((res) => {
        console.log(res);
        localStorage.setItem("CurrentActivity", res.data);
        setRunning(true);
        setStatus(1);
      });
    }
  };

  const pause = () => {
    if (running) {
      setRunning(false);
      setStatus(2);
    } else {
      setRunning(true);
      setStatus(1);
    }
  };

  const finish = (e) => {
    setTime(0);
    setRunning(false);
    setStatus(0);
    e.preventDefault();
    axios({
      method: "PUT",
      url: "https://localhost:7112/api/v1/Activity",
      data: {
        id: localStorage.getItem("CurrentActivity"),
        startDate: new Date(),
        duration: Math.floor(time / 1000),
        distance: distance,
        elevationGain: 0,
        elevationLoss: 0,
        calories: 0,
        inProgress: false,
        sportName: props.sport,
        userEmail: localStorage.getItem("Email"),
      },
    }).then((res) => {
      console.log(res);
      axios({
        method: "POST",
        url: "https://localhost:7112/api/v1/Coordonates",
        data: {
          id: localStorage.getItem("CurrentActivity"),
          points: coordonates,
        },
      }).then((res) => {
        console.log(res);
        localStorage.removeItem("CurrentActivity");

        //localStorage.setItem("CurrentActivity", res.data);
        //setRunning(true);
        //setStatus(1);
      });
      //navigate("/main");
    });
  };

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);
  return (
    <div className="stopwatch">
      <Typography variant="h4" component="h3" className="numbers">
        <Typography variant="h5" component="h3">
          Duration
        </Typography>

        <span>{("0" + Math.floor((time / 3600000) % 100)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        {/* <span>{("0" + ((time / 10) % 100)).slice(-2)}</span> */}
      </Typography>
      <div className={classes.distanceDataContainer}>
        <Typography variant="h5" component="h3">
          <Typography variant="h6" component="h3">
            Distance
          </Typography>
          {distance} m
        </Typography>
        <Typography variant="h5" component="h3">
          <Typography variant="h6" component="h3">
            Avg Speed
          </Typography>
          {speed} km/h
        </Typography>
      </div>

      <div className="buttons">
        <form onSubmit={handleSubmit}>
          {status === 0 ? (
            <Button
              type="submit"
              variant="contained"
              className={`${classes.button} ${classes.colorActive}`}
            >
              {/* Start */}
              <VscDebugStart className={classes.icon} />
            </Button>
          ) : null}
        </form>

        {status === 1 ? (
          <Button
            variant="contained"
            className={`${classes.button} ${classes.colorPause}`}
            onClick={pause}
          >
            <RxPause className={classes.icon} />
          </Button>
        ) : null}

        {status === 2 ? (
          <Button
            variant="contained"
            className={`${classes.button} ${classes.colorActive}`}
            onClick={pause}
          >
            <RxResume className={classes.icon} />
          </Button>
        ) : null}

        {/* </Button> */}
        {status === 1 || status === 2 ? (
          <Button
            variant="contained"
            className={`${classes.button} ${classes.colorStop}`}
            //to implement reset and stop time and put method for activity !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            onClick={finish}
          >
            {/* Finish */}
            <RxStop className={classes.icon} />
          </Button>
        ) : null}
      </div>
      <RenderingMap status={status} func={pull_data} funcCoord={pull_coords} />
    </div>
  );
};
export default Stopwatch;
