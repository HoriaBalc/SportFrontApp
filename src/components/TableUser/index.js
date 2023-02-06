import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  iconDelete: {
    color: "#ffffff",
    background: "linear-gradient(0deg,#ea0707 40%,#b30000 100%)",
    "&:hover": {
      background: "linear-gradient(0deg,#b30000 40%,#ea0707 100%)",
      opacity: 0.9,
    },
    padding: "0.2rem",
    margin: 0,
    borderRadius: 10,
  },
  icon: {
    margin: 20,
    fontSize: "1rem",
    borderRadius: 10,
  },
  tabelTitle: {
    //display: "flex",
    //justifyContent: "center",
  },
}));
