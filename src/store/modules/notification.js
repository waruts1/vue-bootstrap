const state = {
    message: "",
    status:""
  };
  
  const getters = {
    getMessage: (state) => state.message,
    getStatus: (state) => state.status,
  };
  const actions = {
    showNotification({ commit }, { message,status }) {
      commit('setMessage', {message, status});
      setTimeout(() => {
        commit('clearMessage');
      }, 5000); // Adjust the duration as needed
    }
  };
  const mutations = {
    setMessage(state, message, status) {
      state.message = message;
      state.status = status;
    },
    clearMessage(state) {
      state.message = "";
      state.status = ""
    },
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  };