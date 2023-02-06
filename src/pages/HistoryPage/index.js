import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  App: {
    marginTop: "3.5rem",
    marginBottom: "4rem",
  },
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
  CardTitle: {
    display: "flex",
    justifyContent: "space-between",
    gap: "2rem",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  Date: {
    //gap: "1rem",
    // flexGrow: 0,
  },
  Card: {
    cursor: "pointer",
    boxShadow: "0 0 1px 1px rgba(15, 15, 15, 0.3)",
    marginTop: "0.5rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  CardContent: {
    cursor: "pointer",
    marginTop: "0.5rem",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  BasicDetails: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
}));
