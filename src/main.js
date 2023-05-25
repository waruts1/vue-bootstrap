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
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
window.$ = $;
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPencilSquare,faTrash, faHourglass,faHome,faEnvelope,faUserPlus,faSignIn,faTachometer,faSignOut,faMoneyBill,faCreditCard,faPieChart} from "@fortawesome/free-solid-svg-icons";
library.add(faPencilSquare,faTrash,faHourglass,faHome,faEnvelope,faUserPlus,faSignIn,faTachometer,faSignOut,faMoneyBill,faCreditCard,faPieChart);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Initialize Firebase
const app = initializeApp(config);
//getAnalytics(App);
const auth = getAuth()
const db = getFirestore(app);
store.dispatch('user/checkLocalStorage');
DataTable.use(DataTablesCore);
export { app, auth, db }
createApp(App)
    .use(router)
    .use(store)
    .use(VueGoodTablePlugin)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");


