import FormField from "../../components/FormField/index.jsx";
import { useStyles } from "./index.js";
import { Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const classes = useStyles();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //to do the register part after the database is done
  };

  return (
    <div className={classes.mainContainer}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.container}>
          <Typography variant="h4" className={classes.title}>
            Login
          </Typography>

          <FormField
            id={"email"}
            type={"text"}
            label={"Email"}
            className={classes.input}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <FormField
            id={"password"}
            type={"password"}
            label={"Password"}
            className={classes.input}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <div>
            Don't have an account?
            <br />
            <Link to="/">Click Here to register</Link>
          </div>

          <Button type="submit" variant="contained" className={classes.button}>
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
