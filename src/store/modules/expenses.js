import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/main";

  const state = {
    expenses: [],
    totalExpenses :0,
  };
  const getters = {
    expenses(state) {
      return state.expenses;
    },

    totalExpenses(state){
      return state.totalExpenses;
    },

    categoryTotals: state => {
      const categories = {}
      state.expenses.forEach(expense => {
        if (!categories[expense.category]) {
          categories[expense.category] = expense.amount
        } else {
          categories[expense.category] += expense.amount
        }
      })
      return Object.entries(categories).map(([label, value]) => ({ label, value }))
    }
  };
  const mutations = {
    SET_EXPENSES(state, expenses) {
      state.expenses = expenses;
    },
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_TOTAL_EXPENSES(state, totalAmount) {
      state.totalExpenses = totalAmount;
    },
    updateCategoryTotal(state, payload) {
      state.categoryTotals = { ...state.categoryTotals, ...payload };
    },
  };
  const actions = {
    async addExpense({ commit }, payload) {
      try {
        const docRef = await addDoc(collection(db, "expenses"), payload);
        console.warn(payload);
        commit('addExpense', payload);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    categoryTotals({ commit }) {
      const categoryTotals = {};
  
      // Calculate the category totals from your expenses data
      // Assuming expenses is an array of expense objects
      expenses.forEach(expense => {
        if (categoryTotals[expense.category]) {
          categoryTotals[expense.category] += expense.amount;
        } else {
          categoryTotals[expense.category] = expense.amount;
        }
      });
  
      // Commit the mutation to update the category totals in the state
      commit('updateCategoryTotal', categoryTotals);
    },

    // categoryTotals: state => {
    //   const categories = {}
    //   state.expenses.forEach(expense => {
    //     if (!categories[expense.category]) {
    //       categories[expense.category] = expense.amount
    //     } else {
    //       categories[expense.category] += expense.amount
    //     }
    //   })
    //   return Object.entries(categories).map(([label, value]) => ({ label, value }))
    // },
    async calculateTotalExpenses ({ commit }) {
      const querySnapshot = await getDocs(collection(db, 'expenses'));
      let totalAmount = 0;
      querySnapshot.forEach((doc) => {
        const expense = doc.data();
        const amount = parseFloat(expense.amount);
        if (!isNaN(amount)) {
          totalAmount += expense.amount;
        }
        commit('SET_TOTAL_EXPENSES',totalAmount);
      });  
    },

    async register(context, { email, password, name }) {
      const auth = getAuth();
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response) {
        context.commit("SET_USER", response.user);
        context.commit("SET_LOGGED_IN", true);
        //response.user.updateProfile({displayName: name})
      } else {
        throw new Error("Unable to register user");
      }
    },

    async logIn(context, { email, password }) {
      const auth = getAuth();
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit("SET_USER", response.user);
        context.commit("SET_LOGGED_IN", true);
      } else {
        throw new Error("login failed");
      }
    },

    async logOut(context) {
      const auth = getAuth();
      auth.signOut();
      context.commit("SET_USER", null);
      context.commit("SET_LOGGED_IN", false);
    },

    async fetchExpenses({ commit }) {
      const querySnapshot = await getDocs(collection(db, "expenses"));
      const expenses = [];
      querySnapshot.forEach((doc) => {
        expenses.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      commit("SET_EXPENSES", expenses);
    },
  };






// export the store
export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
};
