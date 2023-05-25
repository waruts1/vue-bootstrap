<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">Register</div>
        <div class="card-body">
          <form @submit.prevent="register" class="mb-3">
            <div class="form-group row">
              <label for="email" class="col-md-4 col-form-label text-md-right"
                >Email:</label
              >
              <div class="col-md-6">
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <br />
            <div class="form-group row">
              <label
                for="password"
                class="col-md-4 col-form-label text-md-right"
                >Password:</label
              >
              <div class="col-md-6">
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="form-control"
                  required
                />
              </div>
            </div>

            <hr />
            <div class="col-md-8 offset-md-4">
              <div class="mb-3">
                <button type="submit" class="btn btn-primary me-2">
                  <font-awesome-icon icon="user-plus" class="me-1" />Register
                </button>
              </div>
            </div>
          </form>
          <div class="col-md-8 offset-md-4">
            <div class="mb-3">
              <button @click="registerWithGoogle" class="btn btn-danger">
                <font-awesome-icon icon="envelope" class="me-1" />
                Register with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore ,mapActions } from "vuex";
import {  } from "firebase/auth";
export default {
  name: "Register",
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref(null);
    const router = useRouter();
    const store = useStore();

    const registerWithGoogle = async () => {
      try{
        store.dispatch("user/registerWithGoogle")
        router.push("/dashboard");
      } catch (error){
        console.log(error);
      }
      // Handle registration using email and password
      // ...
    };
    // const registerWithGoogle = async () => {
    //   const auth = getAuth();
    //   const provider = new GoogleAuthProvider();

    //   try {
    //     const t = await signInWithPopup(auth, provider);
    //     console.log(t);
    //     // Registration with Google successful, you can redirect or perform additional actions
    //   } catch (error) {
    //     console.log(error);
    //     // Handle registration error, show an error message, etc.
    //   }
    // };

    const register = async () => {
      error.value = null;
      try {
        const userCredential = await store.dispatch("register", {
          email: email.value,
          password: password.value,
        });
        console.log(userCredential.user);
        console.log(store);
        router.push("/dashboard");
      } catch (err) {
        console.log(err);
        error.value = err.message;
      }
    };

    return {
      email,
      password,
      error,
      register,
      registerWithGoogle,
    };
  },
};
</script>
