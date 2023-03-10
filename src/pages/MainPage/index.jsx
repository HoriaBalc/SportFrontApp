import { useStyles } from "./index.js";
import React, { useState } from "react";

import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import RenderingMap from "../../components/RenderingMap/index.jsx";
import ActivityContainer from "../../components/ActivityContainer/index.jsx";
import Navbar from "../../components/Navbar/index.jsx";

const MainPage = () => {
  const classes = useStyles();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  //const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Navbar page="home" />
      <div className={classes.App}>
        <ActivityContainer></ActivityContainer>
        {/* <button className="permission-granted-button">accept</button> */}
        {/* <RenderingMap /> */}
      </div>
    </div>
  );
};
export default MainPage;
