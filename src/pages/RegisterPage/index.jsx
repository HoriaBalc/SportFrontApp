import FormField from "../../components/FormField/index.jsx";
import { useStyles } from "./index.js";
import {
  Button,
  Typography,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/pickers";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState("01/07/2023");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [phone, setPhone] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [selectedDateError, setSelectedDateError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [taken, setTaken] = React.useState("");
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regexName = /^[\p{L} '-]+$/u;
  const regexPhone = /^\d{10}$/;
  const navigate = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (!e.target.value) {
      setFirstNameError("First name is required!");
    } else if (!regexName.test(e.target.value)) {
      setFirstNameError("This is not a valid first name format!");
    } else if (e.target.value.length < 2) {
      setFirstNameError("First name must have min 2 letters");
    } else setFirstNameError("");
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (!e.target.value) {
      setLastNameError("Last name is required!");
    } else if (!regexName.test(e.target.value)) {
      setLastNameError("This is not a valid last name format!");
    } else if (e.target.value.length < 2) {
      setLastNameError("Last name must have min 2 letters");
    } else setLastNameError("");
  };
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
  const handleHeightChange = (e) => {
    setHeight(e.target.value);
    if (!e.target.value) {
      setHeightError("Height is required!");
    } else if (e.target.value <= 50 || e.target.value > 300) {
      setHeightError("This is an incorect height!");
    } else setHeightError("");
  };
  const handleWeightChange = (e) => {
    setWeight(e.target.value);
    if (!e.target.value) {
      setWeightError("Weight is required!");
    } else if (e.target.value <= 15 || e.target.value > 600) {
      setWeightError("This is an incorect weight!");
    } else setWeightError("");
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (!e.target.value) {
      setPhoneError("Phone is required!");
    } else if (!regexPhone.test(e.target.value)) {
      setPhoneError("This is not a valid phone format!");
    } else setPhoneError("");
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (!date) {
      setSelectedDateError("Birthday is required!");
    } else setSelectedDateError("");
  };

  const validate = () => {
    if (!firstName) {
      setFirstNameError("First name is required!");
    }
    if (!lastName) {
      setLastNameError("Last name is required!");
    }
    if (!email) {
      setEmailError("Email is required!");
    }
    if (!selectedDate) {
      setSelectedDateError("Birthday is required!");
    }
    if (!password) {
      setPasswordError("Password is required");
    }
    if (!height) {
      setHeightError("Height is required!");
    }
    if (!weight) {
      setWeightError("Weight is required!");
    }
    if (!phone) {
      setPhoneError("Phone is required!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTaken("");
    validate();

    if (
      firstNameError === "" &&
      lastNameError === "" &&
      passwordError === "" &&
      emailError === "" &&
      selectedDateError === "" &&
      heightError === "" &&
      weightError === "" &&
      phoneError === "" &&
      firstName &&
      lastName &&
      password &&
      email &&
      selectedDate &&
      height &&
      weight &&
      phone
    ) {
      console.log("nu ajungi");
      axios({
        method: "POST",
        url: "https://localhost:7112/api/v1/User",
        data: {
          firstName: firstName,
          lastName: lastName,
          password: password,
          birthDate: new Date(selectedDate),
          email: email,
          height: height,
          weight: weight,
          phone: phone,
          roleName: "user",
          url: "",
        },
      })
        .then((res) => {
          console.log(res);
          localStorage.setItem("Email", res.data);
          localStorage.setItem("Url", "");
          navigate("/main");
        })
        .catch((e) => {
          setTaken("Email is already used");
          //console.log(e.res);
        });
    }
  };

  return (
    <div className={classes.mainContainer}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.container}>
          <Typography variant="h4" className={classes.title}>
            Register
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
            id={"firstName"}
            type={"text"}
            label={"First Name"}
            className={classes.input}
            onChange={handleFirstNameChange}
          />
          <p className={classes.paragraph}>{firstNameError}</p>
          <FormField
            id={"lastName"}
            type={"text"}
            label={"Last Name"}
            className={classes.input}
            onChange={handleLastNameChange}
          />
          <p className={classes.paragraph}>{lastNameError}</p>
          <FormField
            id={"password"}
            type={"password"}
            label={"Password"}
            className={classes.input}
            onChange={handlePasswordChange}
          />
          <p className={classes.paragraph}>{passwordError}</p>
          <FormField
            id={"Height"}
            type={"number"}
            label={"Height"}
            className={classes.input}
            onChange={handleHeightChange}
          />
          <p className={classes.paragraph}>{heightError}</p>
          <FormField
            id={"Weight"}
            type={"number"}
            label={"Weight"}
            className={classes.input}
            onChange={handleWeightChange}
          />
          <p className={classes.paragraph}>{weightError}</p>
          <FormField
            id={"phone"}
            type={"text"}
            label={"Phone"}
            className={classes.input}
            onChange={handlePhoneChange}
          />
          <p className={classes.paragraph}>{phoneError}</p>
          {/* <div className={classes.item}> */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.datePicker}
              id="birthday"
              label="Birthday"
              maxDate={new Date()}
              InputLabelProps={{
                style: {
                  paddingLeft: 5,
                  color: "#18A558",
                },
              }}
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          {/* </div> */}
          <p className={classes.paragraph}>{selectedDateError}</p>
          <div>
            Already have an account?
            <br />
            <Link className={classes.link} to="/login">
              <span className={classes.link}>Click Here to login</span>
            </Link>
          </div>
          <p className={classes.eror404}>{taken}</p>
          <Button type="submit" className={classes.button} variant="contained">
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;
