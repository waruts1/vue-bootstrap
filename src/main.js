import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { getAuth } from 'firebase/auth'
import 'firebase/auth'
import config from './config'
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { getFirestore } from 'firebase/firestore';
global.jQuery = require('jquery')
const $ = global.jQuery;

window.$ = $;

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faHome} from "@fortawesome/free-solid-svg-icons";

library.add(faHome);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Required for side-effects

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const config = {
//   apiKey: "AIzaSyC1_LJV8KqmenIJv4EezrWGKWIBphuk664",
//   authDomain: "nlp-flutter.firebaseapp.com",
//   projectId: "nlp-flutter",
//   storageBucket: "nlp-flutter.appspot.com",
//   messagingSenderId: "410870841869",
//   appId: "1:410870841869:web:21274eca443d7d8f888b44",
//   measurementId: "G-NVQ49W9T2N"
// };
// Initialize Firebase
const app = initializeApp(config);
//getAnalytics(App);
const auth = getAuth()
const db = getFirestore(app);

export { app, auth, db }
createApp(App)
    .use(router)
    .use(store)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");
