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
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Icon,
} from "@material-ui/core";
import { VscAccount, VscHistory, VscHome } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { MediaQuery } from "@mantine/core";
import Logo from "../../images/pngwing.com.png";

const Navbar = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(props.page);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElUserMobile, setAnchorElUserMobile] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMobileMenu = (event) => {
    setAnchorElUserMobile(event.currentTarget);
  };

  const handleCloseUserMobileMenu = () => {
    setAnchorElUserMobile(null);
  };

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

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box className={classes.root}>
      <span className={classes.appBarMobile}>
        <AppBar position="fixed" className={classes.appBarMobile}>
          <Toolbar className={classes.toolBar}>
            <img alt="logo" src={Logo} className={classes.logo} />

            <Box className={classes.boxButtons}></Box>
            <Box>
              <Tooltip
                title="Open settings mobile"
                className={classes.menuMobile}
              >
                <IconButton onClick={handleOpenUserMobileMenu} sx={{ p: 0 }}>
                  <Avatar src={localStorage.getItem("Url")} />
                </IconButton>
              </Tooltip>
              <Menu
                className={classes.menuMobile}
                id="menu-appbar-mobile"
                anchorEl={anchorElUserMobile}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUserMobile)}
                onClose={handleCloseUserMobileMenu}
              >
                <MenuItem
                  key="logout-mobile"
                  className={classes.menuMobile}
                  onClick={handleLogOut}
                >
                  <Typography textAlign="center" className={classes.menuMobile}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </span>
      <span className={classes.bottomNavigation}>
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
            onClick={handleHome}
          />
          <BottomNavigationAction
            className={classes.bottomNavigationAction}
            label="History"
            value="history"
            icon={<VscHistory className={classes.icon} />}
            onClick={handleHistory}
          />
          <BottomNavigationAction
            className={classes.bottomNavigationAction}
            label="Profile"
            value="profile"
            icon={<VscAccount className={classes.icon} />}
            onClick={handleProfile}
          />
          {/* <BottomNavigationAction
            className={classes.bottomNavigationAction}
            label="Folder"
            value="folder"
            icon={<VscHistory className={classes.icon} />}
          /> */}
        </BottomNavigation>
      </span>
      <span className={classes.appBarPC}>
        <AppBar position="fixed" className={classes.appBarPC}>
          <Toolbar className={classes.toolBar}>
            <img alt="logo" src={Logo} className={classes.logo} />
            <Box className={classes.boxButtons}>
              <Button
                className={classes.button}
                onClick={handleHome}
                //sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>
              <Button
                className={classes.button}
                onClick={handleHistory}
                //sx={{ my: 2, color: "white", display: "block" }}
              >
                History
              </Button>
              {/* <Button
                className={classes.button}
                onClick={handleProfile}
                //sx={{ my: 2, color: "white", display: "block" }}
              >
                Profile
              </Button> */}

              {/* <Button
                className={classes.button}
                onClick={handleLogOut}
                //sx={{ my: 2, color: "white", display: "block" }}
              >
                Logout
              </Button> */}
            </Box>
            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar src={localStorage.getItem("Url")} />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                className={classes.menuPc}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  key="profile"
                  onClick={handleProfile}
                  className={classes.menuPc}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem key="logout" onClick={handleLogOut}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </span>
    </Box>
  );
};

export default Navbar;
