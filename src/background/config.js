import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARfg-n1xmmMEDDTOAhB6fE8lAaUHp6Zqk",
  authDomain: "chat-app-5c392.firebaseapp.com",
  projectId: "chat-app-5c392",
  storageBucket: "chat-app-5c392.appspot.com",
  messagingSenderId: "930935332529",
  appId: "1:930935332529:web:0c8fcbd79e56921a674c90",
  databaseURL: "https://chat-app-5c392-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
export default getAuth();