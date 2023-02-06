import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  IconButton,
  Typography,
} from "@material-ui/core";
import Navbar from "../../components/Navbar/index.jsx";
import { useStyles } from "./index.js";
import axios, { Axios } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiCycling, BiRun, BiSwim, BiWalk } from "react-icons/bi";
import { FaHiking, FaSkiingNordic } from "react-icons/fa";
const HistoryPage = () => {
  const classes = useStyles();
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  function handleDetailActivity(id) {
    localStorage.setItem("ActivityIdHystory", id);
    navigate("/activityDetail");
  }

  function generateIcon(sport) {
    if (sport === "swimming")
      return (
        <Icon>
          <BiSwim />
        </Icon>
      );
    if (sport === "walking")
      return (
        <Icon>
          <BiWalk />
        </Icon>
      );

    if (sport === "running")
      return (
        <Icon>
          <BiRun />
        </Icon>
      );
    if (sport === "cycling")
      return (
        <Icon>
          <BiCycling />
        </Icon>
      );
    if (sport === "ski cross")
      return (
        <Icon>
          <FaSkiingNordic />
        </Icon>
      );
    if (sport === "hiking")
      return (
        <Icon>
          <FaHiking />
        </Icon>
      );

    return <Icon></Icon>;
  }

  function handleDelete(id) {
    axios({
      method: "Delete",
      url: `https://localhost:7112/api/v1/Activity/${id}`,
    }).then((res) => {
      console.log(res);
      let email = localStorage.getItem("Email");
      axios({
        method: "GET",
        url: `https://localhost:7112/api/v1/User/activities/${email}`,
      }).then((res) => {
        console.log(res);
        setActivities(res.data);
      });
    });
  }

  function formatDuration(duration) {
    let hours = Math.floor(duration / 3600);
    let minutes = Math.floor(duration / 60);
    let seconds =
      duration -
      3600 * Math.floor(duration / 3600) -
      60 * Math.floor(duration / 60);
    if (Math.floor(duration / 3600) <= 9) {
      hours = "0" + Math.floor(duration / 3600);
    }
    if (Math.floor(duration / 60) <= 9) {
      minutes = "0" + Math.floor(duration / 60);
    }
    if (
      duration -
        3600 * Math.floor(duration / 3600) -
        60 * Math.floor(duration / 60) <=
      9
    ) {
      seconds = "0" + duration;
    }
    return hours + ":" + minutes + ":" + seconds;
  }

  function formatDate(date) {
    let newDate = date.toString().split("T");
    console.log(date.toString());
    return newDate[0];
  }

  useEffect(() => {
    let email = localStorage.getItem("Email");
    axios({
      method: "GET",
      url: `https://localhost:7112/api/v1/User/activities/${email}`,
    }).then((res) => {
      console.log(res);
      setActivities(res.data);
    });
  }, []);

  return (
    <div>
      <Navbar page="history" />
      <div className={classes.App}>
        {activities !== [] &&
          activities.map((activity) => (
            <Card className={classes.Card}>
              <CardContent
                className={classes.CardContent}
                onClick={() => {
                  localStorage.setItem("ActivityIdHystory", activity.id);
                  navigate("/activityDetail");
                }}
              >
                <div className={classes.CardTitle}>
                  <Typography variant="h6">
                    {generateIcon(activity.sportName)}
                    &nbsp;
                    {activity.sportName}
                  </Typography>
                  <Typography variant="h6" className={classes.Date}>
                    Date: {formatDate(activity.startDate)}
                  </Typography>
                </div>
                <div className={classes.BasicDetails}>
                  <div className={classes.flexContainer}>
                    <div>
                      <Typography>
                        Duration: {formatDuration(activity.duration)}
                      </Typography>
                      <Typography>Distance: {activity.distance} m</Typography>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  onClick={() => handleDelete(activity.id)}
                  className={classes.iconDelete}
                >
                  <MdOutlineDeleteOutline />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        {activities === [] ? <p>You don't have activities</p> : null}
      </div>
    </div>
  );
};
export default HistoryPage;
