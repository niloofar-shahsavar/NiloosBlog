import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANqCnuLV_012YDxQtHMdxhaxCG_G-SYR8",
  authDomain: "authentication-aa7a7.firebaseapp.com",
  projectId: "authentication-aa7a7",
  storageBucket: "authentication-aa7a7.appspot.com",
  messagingSenderId: "299135275666",
  appId: "1:299135275666:web:93fe9a2d3f2dde94b88c4b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
