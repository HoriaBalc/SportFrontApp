import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  App: {
    marginTop: "5rem",
    marginBottom: "4rem",
  },
  FirstElem: {},
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
    width: "10rem",
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
    color: "#ffffff",
    //width: "50%",
    padding: "10px 0px",
    borderRadius: "100px 100px 100px 100px",
    cursor: "pointer",
    background: "linear-gradient(0deg,#18A558 60%,#116530 100%)",
    "&:hover": {
      background: "linear-gradient(0deg,#116530 60%,#18A558 100%)",
      opacity: 0.9,
    },
    width: "5rem",
    top: "-0.25rem",
  },
}));
