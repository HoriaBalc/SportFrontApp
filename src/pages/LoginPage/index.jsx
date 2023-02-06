import FormField from "../../components/FormField/index.jsx";
import { useStyles } from "./index.js";
import { Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import axios from "axios";
//import { loginRequest } from "../authConfig";

const LoginPage = () => {
  const classes = useStyles();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [taken, setTaken] = useState();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value) {
      setEmailError("Email is required!");
    } else if (!regexEmail.test(e.target.value)) {
      setEmailError("This is not a valid email format!");
    } else setEmailError("");
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!e.target.value) {
      setPasswordError("Password is required");
    } else if (e.target.value.length < 6) {
      setPasswordError("Password must have min 6 characters");
    } else if (e.target.value.length > 12) {
      setPasswordError("Password  must have max 12 characters");
    } else setPasswordError("");
  };

  const validate = () => {
    if (!email) {
      setEmailError("Email is required!");
    }
    if (!password) {
      setPasswordError("Password is required");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    if (passwordError === "" && emailError === "" && password && email) {
      axios({
        method: "GET",
        url: `https://localhost:7112/api/v1/User/login/${email}/${password}`,
      })
        .then((res) => {
          console.log(res);
          localStorage.setItem("Email", res.data.email);
          localStorage.setItem("Url", res.data.url);
          navigate("/main");

          // navigate("/admin/sports");
        })
        .catch((e) => {
          setTaken("Wrong credentials");
          //console.log(e.res);
        });
    }
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
            onChange={handleEmailChange}
          />
          <p className={classes.paragraph}>{emailError}</p>

          <FormField
            id={"password"}
            type={"password"}
            label={"Password"}
            className={classes.input}
            onChange={handlePasswordChange}
          />
          <p className={classes.paragraph}>{passwordError}</p>

          <div>
            Don't have an account?
            <br />
            <Link to="/" className={classes.link}>
              <span className={classes.link}>Click Here to register</span>
            </Link>
          </div>

          <p className={classes.erorLogin}>{taken}</p>

          <Button type="submit" variant="contained" className={classes.button}>
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
