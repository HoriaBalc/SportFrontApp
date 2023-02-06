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
} from "@material-ui/core";
import { VscAccount, VscHistory, VscHome } from "react-icons/vsc";
import { FaUsers } from "react-icons/fa";
import { FcSportsMode } from "react-icons/fc";
import Logo from "../../images/pngwing.com.png";
import { useNavigate } from "react-router-dom";

const NavbarAdmin = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(props.page);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElUserMobile, setAnchorElUserMobile] = useState(null);

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

  const handleSports = () => {
    navigate("/admin/sports");
  };
  const handleUsers = () => {
    navigate("/admin/users");
  };
  const handleProfile = () => {
    navigate("/admin/editProfile");
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
            {/* <Button
              className={classes.button}
              onClick={handleProfile}
              //sx={{ my: 2, color: "white", display: "block" }}
            >
              Logout
            </Button> */}
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
            label="Sports"
            value="sports"
            icon={
              <svg
                className={classes.icon}
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1"
                viewBox="0 0 48 48"
                enable-background="new 0 0 48 48"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle fill="currentColor" cx="28" cy="9" r="5"></circle>
                <path
                  fill="currentColor"
                  d="M29,27.3l-9.2-4.1c-1-0.5-1.5,1-2,2c-0.5,1-4.1,7.2-3.8,8.3c0.3,0.9,1.1,1.4,1.9,1.4c0.2,0,0.4,0,0.6-0.1 L28.8,31c0.8-0.2,1.4-1,1.4-1.8C30.2,28.4,29.7,27.6,29,27.3z"
                ></path>
                <path
                  fill="currentColor"
                  d="M26.8,15.2l-2.2-1c-1.3-0.6-2.9,0-3.5,1.3L9.2,41.1c-0.5,1,0,2.2,1,2.7c0.3,0.1,0.6,0.2,0.9,0.2 c0.8,0,1.5-0.4,1.8-1.1c0,0,9.6-13.3,10.4-14.9s4.9-9.3,4.9-9.3C28.7,17.4,28.2,15.8,26.8,15.2z"
                ></path>
                <path
                  fill="currentColor"
                  d="M40.5,15.7c-0.7-0.8-2-1-2.8-0.3l-5,4.2l-6.4-3.5c-1.1-0.6-2.6-0.4-3.3,0.9c-0.8,1.3-0.4,2.9,0.8,3.4 l8.3,3.4c0.3,0.1,0.6,0.2,0.9,0.2c0.5,0,0.9-0.2,1.3-0.5l6-5C41.1,17.8,41.2,16.6,40.5,15.7z"
                ></path>
                <path
                  fill="currentColor"
                  d="M11.7,23.1l3.4-5.1l4.6,0.6l1.5-3.1c0.4-0.9,1.2-1.4,2.1-1.5c-0.1,0-0.2,0-0.2,0h-9c-0.7,0-1.3,0.3-1.7,0.9 l-4,6c-0.6,0.9-0.4,2.2,0.6,2.8C9.2,23.9,9.6,24,10,24C10.6,24,11.3,23.7,11.7,23.1z"
                ></path>
              </svg>
            }
            // {/* <FcSportsMode className={classes.icon} />  */}
            onClick={handleSports}
          />
          <BottomNavigationAction
            className={classes.bottomNavigationAction}
            label="Users"
            value="users"
            icon={<FaUsers className={classes.icon} />}
            onClick={handleUsers}
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
                onClick={handleSports}
                //sx={{ my: 2, color: "white", display: "block" }}
              >
                Sports
              </Button>
              <Button
                className={classes.button}
                onClick={handleUsers}
                //sx={{ my: 2, color: "white", display: "block" }}
              >
                Users
              </Button>
              {/* <Button
                className={classes.button}
                onClick={handleProfile}
                //sx={{ my: 2, color: "white", display: "block" }}
              >
                Profile
              </Button>
              <Button
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

export default NavbarAdmin;
