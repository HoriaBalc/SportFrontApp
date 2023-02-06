import { useStyles } from "./index.js";
import React, { useState } from "react";

import Navbar from "../../components/Navbar/index.jsx";
import TableSport from "../../components/TableSport/index.jsx";
import FormField from "../../components/FormField/index.jsx";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import NavbarAdmin from "../../components/NavbarAdmin/index.jsx";

const AdminSportsPage = (props) => {
  const classes = useStyles();
  const [sportName, setSportName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "GET",
      url: `https://localhost:7112/api/v1/Sport/${sportName}`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        //already exists error
        console.log(e);
        axios({
          method: "POST",
          url: "https://localhost:7112/api/v1/Sport",
          data: { name: sportName },
        }).then((res) => {
          console.log(res);
          setSportName("");
        });
      });
  };

  return (
    <div>
      <NavbarAdmin page="sports" />
      <div className={classes.App}>
        <form on onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            id={"newSport"}
            type={"text"}
            label={"Add new sport"}
            className={classes.input}
            onChange={(e) => {
              setSportName(e.target.value);
            }}
          />
          <Button type="submit" className={classes.button}>
            Add
          </Button>
        </form>
        <TableSport sport={sportName} />
      </div>
    </div>
  );
};
export default AdminSportsPage;
