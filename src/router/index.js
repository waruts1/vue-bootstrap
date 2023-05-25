import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login";
import AnalyseSpeech from "@/components/AnalyseSpeech";
import Register from "@/views/Register";
import Expenses from "@/views/AddExpenses";
import Home from "@/views/Home";
import NotFound from "@/views/NotFound";
import Dashboard from "@/views/Dashboard";
import Savings from "@/views/Savings";
import Loans from "@/views/Loans";
import store from "@/store";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/expenses",
    name: "Expenses",
    component: Expenses,
  },
  {
    path: "/loans",
    name: "loans",
    component: Loans,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/savings",
    name: "Savings",
    component: Savings,
  },
  {
    path: "/analyse-speeches",
    name: "AnalyseSpeech",
    component: AnalyseSpeech,
  },
  {
    path: "/NotFound",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/NotFound",
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});
router.beforeEach((to, from, next) => {
const user = store.getters['user/user'];
const values = Object.values(user);

if (values.some(value => !!value) === false && to.path !== '/' && to.path !== '/login' && to.path !== '/register') {
  next('/login');
} else {
  next();
}
 });
export default router;
