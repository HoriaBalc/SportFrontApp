import { useStyles } from "./index.js";
import React, { useState } from "react";

import Navbar from "../../components/Navbar/index.jsx";
import TableSport from "../../components/TableSport/index.jsx";
import FormField from "../../components/FormField/index.jsx";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import TableUser from "../../components/TableUser/index.jsx";
import NavbarAdmin from "../../components/NavbarAdmin/index.jsx";

const AdminUsersPage = (props) => {
  const classes = useStyles();

  return (
    <div>
      <NavbarAdmin page="users" />
      <div className={classes.App}>
        <TableUser />
      </div>
    </div>
  );
};
export default AdminUsersPage;
