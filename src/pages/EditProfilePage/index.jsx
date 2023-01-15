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
  const navigate = useNavigate();
  const [defaultFirstName, setDefaultFirstName] = useState("");
  const [defaultLastName, setDefaultLastName] = useState("");
  const [defaultPassword, setDefaultPassword] = useState("");
  const [defaultEmail, setDefaultEmail] = useState("");
  const [defaultSelectedDate, setDefaultSelectedDate] = useState("01/07/2023");
  const [defaultHeight, setDefaultHeight] = useState("");
  const [defaultWeight, setDefaultWeight] = useState("");
  const [defaultPhone, setDefaultPhone] = useState("");
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    let email = localStorage.getItem("Email");
    //axios.get()
    axios({
      method: "GET",
      url: `https://localhost:7112/api/v1/User/GetUser/${email}`,
    }).then((res) => {
      console.log(res);
      setDefaultEmail(res.data.email);
      setDefaultFirstName(res.data.firstName);
      setDefaultLastName(res.data.lastName);
      setDefaultPassword(res.data.password);
      setDefaultSelectedDate(res.data.birthDate);
      setDefaultHeight(res.data.height);
      setDefaultWeight(res.data.weight);
      setDefaultPhone(res.data.phone);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "PUT",
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
      },
    }).then((res) => {
      console.log(res);
      navigate("/main");
    });
  };

  return (
    <div className={classes.mainContainer}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.container}>
          <Typography variant="h4" className={classes.title}>
            Edit profile
          </Typography>

          <FormField
            id={"email"}
            type={"text"}
            label={"Email"}
            value={defaultEmail}
            className={classes.input}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <FormField
            id={"firstName"}
            type={"text"}
            label={"First Name"}
            value={defaultFirstName}
            className={classes.input}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <FormField
            id={"lastName"}
            type={"text"}
            label={"Last Name"}
            value={defaultLastName}
            className={classes.input}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <FormField
            id={"password"}
            type={"password"}
            label={"Password"}
            value={defaultPassword}
            className={classes.input}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <FormField
            id={"Height"}
            type={"number"}
            label={"Height"}
            value={defaultHeight}
            className={classes.input}
            onChange={(e) => {
              setHeight(e.target.value);
            }}
          />
          <FormField
            id={"Weight"}
            type={"number"}
            label={"Weight"}
            value={defaultWeight}
            className={classes.input}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
          />
          <FormField
            id={"phone"}
            type={"text"}
            label={"Phone"}
            value={defaultPhone}
            className={classes.input}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <div className={classes.item}>
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
                value={defaultSelectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>

          <Button type="submit" className={classes.button} variant="contained">
            Edit
          </Button>
        </div>
      </form>
    </div>
  );
};
export default EditProfilePage;
