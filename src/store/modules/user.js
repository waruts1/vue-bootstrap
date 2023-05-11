import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    getAuth,
  } from "firebase/auth";
  import { collection, addDoc, getDocs } from "firebase/firestore";
  import { db } from "@/main";
  
  
  
    const state = {
      user: {
        loggedIn: false,
        data: null,
      },
    };
    const getters = {
      user(state) {
        return state.user;
      }
    };
    const mutations = {
      SET_LOGGED_IN(state, value) {
        state.user.loggedIn = value;
      },
      SET_USER(state, data) {
        state.user.data = data;
      }
    };
    const actions = {
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
    };
  
  
  
  
  
  
  // export the store
  export default {
    namespaced: true,
    actions,
    mutations,
    getters,
    state
  };
  