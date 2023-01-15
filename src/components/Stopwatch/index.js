import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  colorActive: {
    background: "linear-gradient(0deg,#18A558 40%,#116530 100%)",
    "&:hover": {
      background: "linear-gradient(0deg,#116530 40%,#18A558 100%)",
      opacity: 0.9,
    },
  },

  colorPause: {
    background: "linear-gradient(0deg,#afafaf 40%,#878787 100%)",
    "&:hover": {
      background: "linear-gradient(0deg,#878787 40%,#afafaf  100%)",
      opacity: 0.9,
    },
  },

  colorStop: {
    background: "linear-gradient(0deg,#ea0707 40%,#b30000 100%)",
    "&:hover": {
      background: "linear-gradient(0deg,#b30000 40%,#ea0707 100%)",
      opacity: 0.9,
    },
  },
  button: {
    "&.MuiButton-root": {
      borderRadius: 20,
    },
    "&.MuiButtonBase-root": {
      marginTop: 10,
      marginBottom: 10,
    },
    "&.MuiButton-contained": {
      color: "#ffffff",
    },
    width: "4.5rem",
    padding: "10px 0px",
    borderRadius: "100px 100px 100px 100px",
    cursor: "pointer",
    // background: "linear-gradient(0deg,#18A558 40%,#116530 100%)",
    // "&:hover": {
    //   background: "linear-gradient(0deg,#116530 40%,#18A558 100%)",
    //   opacity: 0.9,
    //},
  },
  icon: {
    fontSize: "1.7rem",
  },
  distanceDataContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "30%",
  },
}));
