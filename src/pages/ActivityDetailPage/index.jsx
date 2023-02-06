import { useState } from "react";
import { useStyles } from "./index.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/index.jsx";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import {
  GoogleMap,
  MarkerF,
  Polyline,
  useGoogleMap,
  useLoadScript,
} from "@react-google-maps/api";
import { createElement } from "react";
import loadGMaps from "../../components/hooks.jsx";
import { Typography } from "@material-ui/core";
import { setDate } from "date-fns";
import { GoPrimitiveDot } from "react-icons/go";

const ActivityDetail = () => {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [sport, setSport] = useState("");
  const [date, setDate] = useState();
  const [activity, setActivity] = useState({});
  const [coords, setCoords] = useState([]);
  // const onLoad = (polyline) => {
  //   console.log("polyline: ", polyline);
  // };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  let contor = 0;
  const options = {
    strokeColor: "#18A558",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#18A558",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: coords,
    zIndex: 1,
  };

  function computeSpeed(time, distance) {
    if (distance === 0) return 0;
    let computedSpeed = (100 * ((distance / time) * (18 / 5))) / 1;
    return Math.floor(computedSpeed) / 100;
  }

  function formatDate(date) {
    let newDate = date.toString().split("T");
    console.log(date.toString());
    return newDate[0];
  }

  function formatDuration(duration) {
    let hours = Math.floor(duration / 3600);
    let minutes = Math.floor(duration / 60);
    let seconds =
      duration -
      3600 * Math.floor(duration / 3600) -
      60 * Math.floor(duration / 60);
    if (Math.floor(duration / 3600) <= 9) {
      hours = "0" + Math.floor(duration / 3600);
    }
    if (Math.floor(duration / 60) <= 9) {
      minutes = "0" + Math.floor(duration / 60);
    }
    if (
      duration -
        3600 * Math.floor(duration / 3600) -
        60 * Math.floor(duration / 60) <=
      9
    ) {
      seconds = "0" + duration;
    }
    return hours + ":" + minutes + ":" + seconds;
  }

  // window.onload = () => {
  //   window.location.reload(false);
  // };
  // window.onload = () => {
  //   let activityId = localStorage.getItem("ActivityIdHystory");
  //   axios({
  //     method: "GET",
  //     url: `https://localhost:7112/api/v1/Activity/${activityId}`,
  //   }).then((res) => {
  //     console.log(res);
  //     setActivity(res.data);
  //     axios({
  //       method: "GET",
  //       url: `https://localhost:7112/api/v1/Coordonates/${activityId}`,
  //     }).then((res) => {
  //       console.log(res);
  //       let destinations = [];

  //       res.data.points.forEach((coord) => {
  //         destinations.push({ lat: coord.latitude, lng: coord.longitude });
  //       });

  //       setCoords(destinations);
  //       console.log(destinations);
  //       console.log(coords);
  //       setLoaded(true);
  //       // var poli = createElement(Polyline);
  //       // poli.path = destinations;
  //       // poli.options = options;
  //       // var m = document.getElementById("map");
  //       // m.appendChild(poli)
  //     });
  //   });
  // };

  useEffect(() => {
    let activityId = localStorage.getItem("ActivityIdHystory");
    axios({
      method: "GET",
      url: `https://localhost:7112/api/v1/Activity/${activityId}`,
    }).then((res) => {
      console.log(res);
      setActivity(res.data);
      setDistance(res.data.distance);
      setTime(res.data.duration);
      setDate(res.data.startDate);
      axios({
        method: "GET",
        url: `https://localhost:7112/api/v1/Coordonates/${activityId}`,
      }).then((res) => {
        console.log(res);
        let destinations = [];

        res.data.points.forEach((coord) => {
          destinations.push({ lat: coord.latitude, lng: coord.longitude });
        });

        setCoords(destinations);
        console.log(destinations);
        console.log(coords);
        setLoaded(true);
        // var poli = createElement(Polyline);
        // poli.path = destinations;
        // poli.options = options;
        // var m = document.getElementById("map");
        // m.appendChild(poli)
      });
    });
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  // wrapping to a function is useful in case you want to access `window.google`
  // to eg. setup options or create latLng object, it won't be available otherwise
  // feel free to render directly if you don't need that
  //const onLoad = React.useCallback(function onLoad(mapInstance) {
  //   // do something with map Instance
  //});

  return (
    <div>
      <Navbar page="history" />
      <div className={classes.App}>
        {console.log("dasdsa")}
        {console.log(coords)}
        <Typography className="numbers" variant="h4" component="h3">
          <Typography variant="h5" component="h3">
            Duration
          </Typography>
          {formatDuration(time)}
        </Typography>
        <div className={classes.dataContainer}>
          <Typography variant="h5" component="h5">
            <Typography variant="h6" component="h5">
              Distance
            </Typography>
            {distance} m
          </Typography>
          <Typography variant="h5" component="h3">
            <Typography variant="h6" component="h3">
              Avg Speed
            </Typography>
            {computeSpeed(time, distance)} km/h
          </Typography>
        </div>
        <Typography variant="h5" component="h3">
          <Typography variant="h6" component="h3">
            Date
          </Typography>
          {formatDate(date)}
          {/* <span>{("0" + ((time / 10) % 100)).slice(-2)}</span> */}
        </Typography>
        <GoogleMap
          zoom={10}
          center={coords[0]}
          id="map"
          mapContainerClassName={classes.MapContainer}
          options={{
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            passive: true,
          }}
        >
          {coords.map((coord) => {
            contor++;
            if (contor === 1) {
              return (
                <MarkerF key={coord.position} position={coord} label="start" />
              );
            }
            if (contor === coords.length) {
              return (
                <MarkerF key={coord.position} position={coord} label="finish" />
              );
            }
            if (contor < coords.length && contor > 1) {
              return (
                <MarkerF
                  key={coord.position}
                  position={coord}
                  label="point"
                  // icon={
                  //   "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                  // }
                />
              );
            }
          })}{" "}
          <Polyline path={coords} options={options} />
          {/* <MarkerF
            position={coords[0]}
            //icon=""
            label="start"
          ></MarkerF>
          <MarkerF
            position={coords[coords.length - 1]}
            //icon=""
            label="finish"
          ></MarkerF> */}
        </GoogleMap>
      </div>
    </div>
  );
};

export default ActivityDetail;
