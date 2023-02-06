import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  form: {
    height: window.innerHeight,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    marginTop: "2rem",
    marginBottom: "3rem",
  },

  paragraph: {
    padding: 0,
    margin: 0,
    fontSize: 12,
    color: "red",
    position: "relative",
    top: "-0.4rem",
    // left: "10px",
  },

  link: { color: "#18A558", decorations: "none" },

  eror404: {
    padding: 0,
    margin: 0,
    fontSize: 14,
    color: "red",
    position: "relative",
    top: "0.2rem",
  },

  mainContainer: {
    display: "flex",
    margin: "auto",
    alignItems: "center",
  },

  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    position: "relative",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "20px",
    justifyContent: "center",
    // boxShadow: "0 0 2px rgba(15, 15, 15, 0.28)",
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
    width: "10rem",
    padding: "10px 0px",
    borderRadius: "100px 100px 100px 100px",
    cursor: "pointer",
    background: "linear-gradient(0deg,#18A558 60%,#116530 100%)",
    "&:hover": {
      background: "linear-gradient(0deg,#116530 60%,#18A558 100%)",
      opacity: 0.9,
    },
  },

  title: {
    "&.MuiTypography-root": {
      margin: "10px 0px 10px 0px",
    },
    "&.MuiTypography-h4": {
      fontFamily: "Roboto, sans-serif, bold",
    },
    color: "#18A558",
  },

  input: {
    padding: "0px 10px",
    borderBottom: "1px solid transparent",
    fontSize: 12,
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
    outline: "none",
    color: "#FFFFFF ",
    width: "15rem",
  },

  datePicker: {
    width: "15rem",
  },
}));
