const state = {
    loans: [],
  };
  
  const getters = {
    getLoans: (state) => state.loans,
  };
  
  const mutations = {
    addLoan(state, loan) {
      state.loans.push(loan);
    },
    updateLoan(state, updatedLoan) {
      const index = state.loans.findIndex((loan) => loan.id === updatedLoan.id);
      if (index !== -1) {
        state.loans.splice(index, 1, updatedLoan);
      }
    },
    deleteLoan(state, loanId) {
      state.loans = state.loans.filter((loan) => loan.id !== loanId);
    },
  };
  
  const actions = {
    createLoan({ commit }, loan) {
      // Generate a unique ID for the loan (you can use a library like uuid)
      const loanWithId = { ...loan, id: generateUniqueId() };
      commit('addLoan', loanWithId);
    },
    updateLoan({ commit }, updatedLoan) {
      commit('updateLoan', updatedLoan);
    },
    deleteLoan({ commit }, loanId) {
      commit('deleteLoan', loanId);
    },
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  };