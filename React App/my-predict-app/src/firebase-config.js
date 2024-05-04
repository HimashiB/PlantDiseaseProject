import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB0QJeJXssu0BsGDBmuq1vdpE73qrCmeXI",
  authDomain: "plantpredictiondb.firebaseapp.com",
  projectId: "plantpredictiondb",
  storageBucket: "plantpredictiondb.appspot.com",
  messagingSenderId: "94365169091",
  appId: "1:94365169091:web:993956a32e46829c8d3976",
  measurementId: "G-QL7DWNZVG9"
};

const app = initializeApp(firebaseConfig);

export default app;
