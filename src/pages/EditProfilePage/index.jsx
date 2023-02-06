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
import { useEffect } from "react";
import Navbar from "../../components/Navbar/index.jsx";
import { ReactFirebaseUploadFile } from "../../components/firebase/index.jsx";

const EditProfilePage = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState("01/07/2023");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [phone, setPhone] = useState("");
  const [url, setUrl] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [selectedDateError, setSelectedDateError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const regexName = /^[\p{L} '-]+$/u;
  const regexPhone = /^\d{10}$/;
  const navigate = useNavigate();

  const pull_data = (data) => {
    setUrl(data);
  };

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
    // if (!selectedDate) {
    //   setSelectedDateError("Birthday is required!");
    // }
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

  useEffect(() => {
    let email = localStorage.getItem("Email");
    axios({
      method: "GET",
      url: `https://localhost:7112/api/v1/User/GetUser/${email}`,
    }).then((res) => {
      console.log(res);
      setEmail(res.data.email);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setPassword(res.data.password);
      setSelectedDate(res.data.birthDate);
      setHeight(res.data.height);
      setWeight(res.data.weight);
      setPhone(res.data.phone);
      setUrl(res.data.url);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      let emailStorage = localStorage.getItem("Email");
      axios({
        method: "PUT",
        url: "https://localhost:7112/api/v1/User",
        data: {
          firstName: firstName,
          lastName: lastName,
          password: password,
          birthDate: new Date(selectedDate),
          email: emailStorage,
          height: height,
          weight: weight,
          phone: phone,
          url: url,
        },
      }).then((res) => {
        console.log(res);
        localStorage.setItem("Url", url);
        navigate("/main");
      });
    }
  };

  return (
    <div className={classes.mainContainer}>
      <Navbar page="profile" />

      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.container}>
          <Typography variant="h4" className={classes.title}>
            Edit profile
          </Typography>
          <ReactFirebaseUploadFile func={pull_data} url={url} />
          <FormField
            id={"email"}
            type={"text"}
            label={"Email"}
            value={email}
            className={classes.input}
            onChange={handleEmailChange}
          />
          <p className={classes.paragraph}>{emailError}</p>

          <FormField
            id={"firstName"}
            type={"text"}
            label={"First Name"}
            value={firstName}
            className={classes.input}
            onChange={handleFirstNameChange}
          />
          <p className={classes.paragraph}>{firstNameError}</p>

          <FormField
            id={"lastName"}
            type={"text"}
            label={"Last Name"}
            value={lastName}
            className={classes.input}
            onChange={handleLastNameChange}
          />
          <p className={classes.paragraph}>{lastNameError}</p>

          <FormField
            id={"password"}
            type={"password"}
            label={"Password"}
            value={password}
            className={classes.input}
            onChange={handlePasswordChange}
          />
          <p className={classes.paragraph}>{passwordError}</p>

          <FormField
            id={"Height"}
            type={"number"}
            label={"Height"}
            value={height}
            className={classes.input}
            onChange={handleHeightChange}
          />
          <p className={classes.paragraph}>{heightError}</p>

          <FormField
            id={"Weight"}
            type={"number"}
            label={"Weight"}
            value={weight}
            className={classes.input}
            onChange={handleWeightChange}
          />
          <p className={classes.paragraph}>{weightError}</p>

          <FormField
            id={"phone"}
            type={"text"}
            label={"Phone"}
            value={phone}
            className={classes.input}
            onChange={handlePhoneChange}
          />
          <p className={classes.paragraph}>{phoneError}</p>

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
          <p className={classes.paragraph}>{selectedDateError}</p>

          <Button type="submit" className={classes.button} variant="contained">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
export default EditProfilePage;
