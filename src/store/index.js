import { createStore } from "vuex";
import expenses from "./modules/expenses";
import savings from "./modules/savings";
import user from "./modules/user";
import loans from './modules/loans';
import notification from './modules/notification';
import loader from './modules/loader';
const store =  createStore({
  modules: {
    expenses,
    savings,
    user,
    loans,
    notification,
    loader
  },
});

export default store;