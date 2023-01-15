import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "6rem",
    //height: "2rem",
    //outline: "none",
    padding: 0,
    fontSize: 12,
    margin: "0rem",
    marginTop: "0.8rem",
    marginRight: "0.8rem",
    position: "relative",
    "& .MuiOutlinedInput-input": {
      padding: "0.5rem 1rem 0.5rem 0rem",
    },
  },

  select: { padding: 0 },
  selectPosition: {
    alignItems: "right",
    textAlign: "right",
  },
  inputLabel: {
    "& .MuiInputLabel-outlined": { position: "relative", top: "-1rem" },
    //"& .MuiSelect-nativeInput": { position: "relative", top: "1rem" },
    padding: "0rem 0rem 0rem 0rem",
    marginBottom: "0rem",
    top: "-0.4rem",
    left: "0.7rem",
    // "& .PrivateNotchedOutline-legendLabelled-7 > span": {
    //   top: "0.5rem",
    // },
  },
}));
