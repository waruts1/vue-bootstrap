import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup, getAuth, GoogleAuthProvider
} from "firebase/auth";
import store from "@/store";

import { useRouter } from "vue-router";
const router = useRouter();
const state = {
  user: {
    loggedIn: "",
    email: "",
    token: "",
    uid: "",
    expiredTime: "",
  },
};
const getters = {
  user(state) {
    return state.user;
  },
  userValues(state, getters) {
    const values = Object.values(state.user);
    return values.some((value) => !!value);
  },
};
const mutations = {
  SET_LOGGED_IN(state, value) {
    state.loggedIn = value;
  },
  setToken(state, token) {
    state.token = token;
  },
  clearCredentials(state) {
    state.user.loggedIn = false;
    state.user.email = "";
    state.user.token = "";
    state.user.uid = " ";
  },
  setUser(state, { user, flag }) {
    state.user.email = user.email;
    state.user.uid = user.uid;
    state.user.token = user.token;
    state.user.loggedIn = flag;
    state.user.expiredTime = user.expiredTime;
  },
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
      //context.commit("SET_USER", response.user);
      console.log(response.data);
      //context.commit("SET_LOGGED_IN", true);

      // Store the credentials in the browser's local storage or session storage
      //localStorage.setItem('username', username);
    } else {
      throw new Error("Unable to register user");
    }
  },
  checkLocalStorage(context) {
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    if (user) {
      const { email, token, uid, expirationTime } = user;
      const date = new Date(user.expirationTime);
      const currentTimestamp = Date.now();
      const currentDate = new Date(currentTimestamp);
      console.log(date);

      if (date > currentDate) {
        const updatedUser = {
          email,
          token,
          uid,
        };
        store.dispatch("notification/showNotification", {message:"Session Valid", status:"danger"});
        context.commit("setUser", { user: updatedUser, flag: true });
        // router.push("/dashboard");
      } else {
        store.dispatch("notification/showNotification", {message:"Session Invalid", status:"danger"});
        localStorage.removeItem("user");
        context.commit("clearCredentials", state);
        router.push("/login");
      }
    }
  },
  async logIn(context, { email, password }) {
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, email, password);
    if (response) {
      saveToLocalStrorage(response, context);
     
    } 
    router.push("/dashboard");
  },

  async loginWithGoogle({ context }) {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const response = await signInWithPopup(auth,provider);
      if (response) {
        saveToLocalStrorage(response, context);
      }
      router.push("/dashboard");
      // Handle successful login or redirection here
    } catch (err) {
      console.log(err);
      // Handle error
      store.dispatch("notification/showNotification", {message:err,status:"danger"});
    }
  },

  async registerWithGoogle(context) {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      console.log(response.user);
      if (response) {
        saveToLocalStrorage(response, context);
        router.push("/dashboard");
        // Registration with Google successful, you can redirect or perform additional actions
      }
    } catch (error) {
      console.log(error);
      store.dispatch("notification/showNotification", "Registration Failed");
      // Handle registration error, show an error message, etc.
    }
  },

  async logOut(context) {
    const auth = getAuth();
    auth.signOut();
    context.commit("clearCredentials");
    localStorage.removeItem("user");
  },
};

// export the store
export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};
function saveToLocalStrorage(response, context) {
  const user = {
    uid: "",
    email: "",
    token: "",
    expirationTime: "",
  };
  const getUser = response.user;
  user.uid = getUser.uid;
  user.email = getUser.email;
  user.token = getUser.accessToken;
  user.expirationTime = getUser.stsTokenManager.expirationTime;
  // Convert the user object to a JSON string
  const userJSON = JSON.stringify(user);

  // Save the user JSON string in the localStorage
  localStorage.setItem("user", userJSON);
  context.commit("setUser", {user:user, lag:true});
}
