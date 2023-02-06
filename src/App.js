import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import * as routes from "./routes.js";
import RegisterPage from "./pages/RegisterPage/index.jsx";
import LoginPage from "./pages/LoginPage/index.jsx";
import MainPage from "./pages/MainPage/index.jsx";
import EditProfilePage from "./pages/EditProfilePage/index.jsx";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import HistoryPage from "./pages/HistoryPage/index.jsx";
import ActivityDetail from "./pages/ActivityDetailPage/index.jsx";
import AdminSportsPage from "./pages/AdminSportsPage/index.jsx";
import AdminUsersPage from "./pages/AdminUsersPage/index.jsx";
import AdminEditProfilePage from "./pages/AdminEditProfile/index.jsx";

// import {
//   AuthenticatedTemplate,
//   UnauthenticatedTemplate,
//   useMsal,
// } from "@azure/msal-react";
//import { loginRequest } from "./authConfig";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#18A558",
    },
    secondary: { main: "#F39C12" },
  },
  typography: {
    fontFamily: [
      "Poppins",
      "-apple - system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      " sans - serif",
    ],
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route exact path={routes.register} element={<RegisterPage />} />
            <Route exact path={routes.login} element={<LoginPage />} />
            {/* <AuthenticatedTemplate> */}
            <Route exact path={routes.main} element={<MainPage />} />
            {/* </AuthenticatedTemplate> */}
            <Route
              exact
              path={routes.adminSports}
              element={<AdminSportsPage />}
            />
            <Route
              exact
              path={routes.adminUsers}
              element={<AdminUsersPage />}
            />

            <Route exact path={routes.history} element={<HistoryPage />} />
            <Route
              exact
              path={routes.activityDetail}
              element={<ActivityDetail />}
            />

            <Route
              exact
              path={routes.editProfile}
              element={<EditProfilePage />}
            />

            <Route
              exact
              path={routes.adminEditProfile}
              element={<AdminEditProfilePage />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
