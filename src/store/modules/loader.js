const state = {
    isLoading: false,
  };
  
  const mutations = {
    setLoading(state, value) {
      state.isLoading = value;
    },
  };
  
  const actions = {
    showLoader({ commit }) {
      commit('setLoading', true);
    },
    hideLoader({ commit }) {
      commit('setLoading', false);
    },
  };
  
  const getters = {
    isLoading: state => state.isLoading,
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  };
  