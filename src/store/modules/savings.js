
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/main";

  const state = {
    savings: [],
  };
  
  const mutations = {
    SET_SAVINGS(state, savings) {
      state.savings = savings;
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
      //Example: return state.savings.reduce((total, saving) => total + saving.amount, 0);
    },
  };


  
export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state
};