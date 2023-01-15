import { useStyles } from "./index.js";
import { TextField } from "@material-ui/core";

const FormField = (props) => {
  const { id, type, inputRef, label, name, onChange, value, ...other } = props;
  const classes = useStyles();

  return (
    <TextField
      id={id}
      type={type}
      className={classes.input}
      label={label}
      autoComplete="new-password"
      //inputProps={{ autoComplete: "off" }}
      inputProps={{
        fontFamily: "inherit",
      }}
      InputLabelProps={{
        style: {
          paddingLeft: 5,
          color: "#18A558",
        },
      }}
      onChange={onChange}
      variant="outlined"
      value={value}
      {...other}
    />
  );
};
export default FormField;
