import { useState } from "react";
import { useStyles } from "./index.js";
import {
  Box,
  AppBar,
  Button,
  BottomNavigationAction,
  BottomNavigation,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { VscAccount, VscHistory, VscHome } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const classes = useStyles();
  const [value, setValue] = useState("home");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleHome = () => {
    navigate("/main");
  };
  const handleHistory = () => {
    navigate("/history");
  };
  const handleProfile = () => {
    navigate("/editProfile");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className={classes.appBarMobile}>
        <Toolbar className={classes.toolBar}>
          <Typography>Logo</Typography>
        </Toolbar>
      </AppBar>

      <AppBar position="fixed" className={classes.appBarPC}>
        <Toolbar className={classes.toolBar}>
          <Typography>Logo</Typography>
          <Box className={classes.boxButtons}>
            <Button
              className={classes.button}
              onClick={handleHome}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              className={classes.button}
              onClick={handleHistory}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              History
            </Button>
            <Button
              className={classes.button}
              onClick={handleProfile}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Profile
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <BottomNavigation
        className={classes.bottomNavigation}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          className={classes.bottomNavigationAction}
          label="Home"
          value="home"
          icon={<VscHome className={classes.icon} />}
        />
        <BottomNavigationAction
          className={classes.bottomNavigationAction}
          label="History"
          value="history"
          icon={<VscHistory className={classes.icon} />}
        />
        <BottomNavigationAction
          className={classes.bottomNavigationAction}
          label="Profile"
          value="profile"
          icon={<VscAccount className={classes.icon} />}
        />
        <BottomNavigationAction
          className={classes.bottomNavigationAction}
          label="Folder"
          value="folder"
          icon={<VscHistory className={classes.icon} />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Navbar;
