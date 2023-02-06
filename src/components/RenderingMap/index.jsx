import { useStyles } from "./index.js";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import React, { useState } from "react";

function computeDistance(lat1, lat2, lon1, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;
  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
  let c = 2 * Math.asin(Math.sqrt(a));
  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;
  // calculate the result
  return c * r;
}

const RenderingMap = (props) => {
  const classes = useStyles();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [coords, setCoords] = useState([]);
  const [distance, setDistance] = useState(0.0);
  //const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [accept, setAccept] = useState(false);
  props.func(distance);
  props.funcCoord(coords);
  if (!isLoaded) return <div>Loading...</div>;

  window.onload = GetPosition;

  function GetPosition(active) {
    var startPos;
    function error(err) {
      console.error(`ERROR(${err.code}): ${err.message}`);
    }
    let options = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 0,
    };
    var geoSuccess = function (position) {
      startPos = position;
      console.log(startPos);
      let latitude = startPos.coords.latitude;
      let longitude = startPos.coords.longitude;
      let altitude = startPos.coords.altitude;
      setCenter({ lat: latitude, lng: longitude });
      console.log(altitude);
    };
    if (active) {
      if (props.status === 1) {
        let a = document.querySelector("#map");
        let b = document.createElement("MarkerF");
        b.position = { center };
        setCoords((oldArray) => [...oldArray, center]);
        if (coords.length > 1) {
          let d = computeDistance(
            coords[coords.length - 2].lat,
            coords[coords.length - 1].lat,
            coords[coords.length - 2].lng,
            coords[coords.length - 1].lng
          );
          setDistance(distance + d * 1000);
          console.log(d + " " + distance);
        }

        //b.label=
        a.appendChild(b);
        console.log("added");
      }
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, error, options);
  }

  setTimeout(() => {
    console.log("you can see me after 5 seconds");
    GetPosition(true);
  }, 5000);

  return (
    <div>
      {/* <span>Distance:{distance}</span> */}
      <GoogleMap
        zoom={10}
        center={center}
        id="map"
        mapContainerClassName={classes.MapContainer}
        options={{
          zoomControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
        }}
      >
        <MarkerF
          position={center}
          //icon=""
          label={center.lat + ", " + center.lng}
        />
      </GoogleMap>
    </div>
  );
};
export default RenderingMap;
