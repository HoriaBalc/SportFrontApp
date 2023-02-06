import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  toolBar: { minHeight: "3rem" },
  menuMobile: { width: "8rem" },
  menuPc: { width: "8rem" },
  bottomNavigation: {
    width: "100%",
    bottom: 0,
    position: "fixed",
    left: 0,
    right: 0,
    minHeight: "3rem",
    zIndex: 2,
    display: "flex",
  },

  bottomNavigationAction: {
    margin: 0,
  },

  root: {
    // "& .MuiAppBar-root": {
    //   display: "none",
    // },
    "& .MuiIconButton-label": {
      margin: 0,
      justifyContent: "end",
    },
  },

  boxButtons: {
    //display: "flex",
    //justifyContent: "center",
    flexGrow: 1,
    //alignItems: "center",
  },

  appBarMobile: {
    display: "block",
  },

  appBarPC: {
    display: "none",
  },

  icon: {
    fontSize: "1.5rem",
  },
  logo: {
    width: "3rem",
    justifyContent: "center",
    display: "flex",
  },
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

  "@media screen and (min-width: 550px)": {
    bottomNavigation: {
      display: "none",
    },
    appBarMobile: { display: "none" },
    appBarPC: { display: "block" },
  },
}));
