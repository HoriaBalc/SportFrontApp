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
            <Route exact path={routes.main} element={<MainPage />} />
            <Route
              exact
              path={routes.editProfile}
              element={<EditProfilePage />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
