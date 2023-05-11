import { createStore } from "vuex";
import expenses from "./modules/expenses";
import savings from "./modules/savings";
import user from "./modules/user";
const store =  createStore({
  modules: {
    expenses,
    savings,
    user
  },
});

export default store;