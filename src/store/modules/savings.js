
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/main";

  const state = {
    savings: [],
    totalSavings :0
  };
  
  const mutations = {
    SET_SAVINGS(state, savings) {
      state.savings = savings;
    },
    SET_TOTAL_SAVINGS(state, totalAmount) {
      state.totalSavings = totalAmount;
    },
    ADD_SAVING(state, saving) {
      state.savings.push(saving);
    },
    DELETE_SAVING(state, savingId) {
      state.savings = state.savings.filter((saving) => saving.id !== savingId);
    },
  };
  
  const actions = {
    fetchSavings({ commit }) {
      // Fetch savings from API or database and commit the mutations
      
      commit('SET_SAVINGS', savings);
    },

    async calculateTotalSavings ({ commit }) {
      const querySnapshot = await getDocs(collection(db, 'savings'));
      let totalAmount = 0;
      querySnapshot.forEach((doc) => {
        const expense = doc.data();
        const amount = parseFloat(savings.amount);
        if (!isNaN(amount)) {
          totalAmount += expense.amount;
        }
        commit('SET_TOTAL_SAVINGS',totalAmount);
      });  
    },
    async addSaving({ commit }, saving) {
      try {
        const docRef = await addDoc(collection(db, "savings"), saving);
        commit('ADD_SAVING', saving);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      // Add a saving to the API or database and commit the mutation
    },
    deleteSaving({ commit }, savingId) {
      // Delete a saving from the API or database and commit the mutation
      // Example: commit('DELETE_SAVING', savingId);
    },
  };
  
  const getters = {
    totalSavings(state) {
      //Compute and return the total savings based on state.savings
      return state.savings.reduce((total, saving) => total + saving.amount, 0);
    },
    // totalExpenses(state){
    //   return state.totalExpenses;
    // },
  };


  
export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
};