import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDI5aiMCnQ6pHrEsBNqevdMxe-iesAVFBw",
  authDomain: "fir-react-upload-98811.firebaseapp.com",
  projectId: "fir-react-upload-98811",
  storageBucket: "fir-react-upload-98811.appspot.com",
  messagingSenderId: "550070510443",
  appId: "1:550070510443:web:f0ed2334aaa9db7e65222e",
  measurementId: "G-ZN28HE1PFZ",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
