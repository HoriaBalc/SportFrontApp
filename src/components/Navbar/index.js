import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  toolBar: { minHeight: "3rem" },

  bottomNavigation: {
    width: "100%",
    bottom: 0,
    position: "fixed",
    left: 0,
    right: 0,
    minHeight: "3rem",
    zIndex: 1,
  },

  appBarMobile: { display: "block" },

  appBarPC: { display: "none" },

  "@media (min-width: 550px)": {
    bottomNavigation: {
      display: "none",
    },
    appBarMobile: { display: "none" },
    appBarPC: { display: "block" },
  },

  bottomNavigationAction: {
    margin: 0,
  },

  icon: {
    fontSize: "1.5rem",
  },

  boxButtons: { flexGrow: 1 },

  button: {
    "&.MuiButton-contained": {
      color: "#ffffff",
    },
    color: "#ffffff",
    //width: "50%",
    gap: "1rem",
    cursor: "pointer",
    background: "#18A558",
    "&:hover": {
      background: "linear-gradient(0deg,#116530 60%,#18A558  100%)",
      opacity: 0.9,
    },
  },
}));
