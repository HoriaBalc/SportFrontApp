import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  App: { marginTop: "4rem", marginBottom: "4rem" },
  MapContainer: {
    width: "100%",
    height: "70vh",
    //marginBottom: "3rem",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  numbers: {
    //textAlign: "center",
    position: "relative",
    left: "10rem",
  },
}));
