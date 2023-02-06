import { Avatar, Button } from "@material-ui/core";
import React, { useState } from "react";
import { render } from "react-dom";
//import eventBus from "../EventBus";
import { storage } from "./firebaseConfig.js";
import { useStyles } from "./index.js";

export const ReactFirebaseUploadFile = (props) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(props.url);
  const classes = useStyles("");
  const [progress, setProgress] = useState(0);
  const fileInput = React.useRef();
  props.func(url);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const uploadTask = storage
        .ref(`images/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(e.target.files[0].name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              // eventBus.dispatch("urlApply", { message: url });
              setUrl(url);
            });
        }
      );
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setUrl(url);
          });
      }
    );
  };

  return (
    <div className={classes.container}>
      <div>
        <Avatar
          src={url || "/broken-image.jpg"}
          onClick={() => fileInput.current.click()}
          className={classes.image}
        />
        <input
          type="file"
          onChange={handleChange}
          ref={fileInput}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

//render(<ReactFirebaseUploadFile />, document.querySelector("#root"));
