<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        {{ user }}
        <div class="card-header">Login</div>
        <div class="card-body">
          <div v-if="error" class="alert alert-danger">{{ error }}</div>
          <form action="#" @submit.prevent="login">
            <div class="form-group row">
              <label for="email" class="col-md-4 col-form-label text-md-right"
                >Email</label
              >

              <div class="col-md-6">
                <input
                  id="email"
                  type="email"
                  class="form-control"
                  name="email"
                  value
                  required
                  autofocus
                  v-model="email"
                />
              </div>
            </div>
            <br />
            <div class="form-group row">
              <label
                for="password"
                class="col-md-4 col-form-label text-md-right"
                >Password</label
              >

              <div class="col-md-6">
                <input
                  id="password"
                  type="password"
                  class="form-control"
                  name="password"
                  required
                  v-model="password"
                />
              </div>
              <br />
            </div>
            <br />
            <div class="form-group row mb-0">
              <div class="col-md-8 offset-md-4">
                <button type="submit" class="btn btn-primary">
                  <font-awesome-icon icon="sign-in" class="me-1" /> Login
                </button>
              </div>
            </div>
          </form>
          <hr />
          <button
            class="col-md-2 form-control btn btn-danger"
            @click="loginWithGoogle"
          >
            <font-awesome-icon icon="envelope" class="me-1" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore, mapActions } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "LoginComponent",
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref(null);

    const store = useStore();
    const router = useRouter();
    // Map the showLoader action
    const login = async () => {
      store.dispatch("loader/showLoader");
      try {
        await store
          .dispatch("user/logIn", {
            email: email.value,
            password: password.value,
          })
          .then(() => {
            this.$router.push("/dashboard");
          });

        router.push("/dashboard");
      } catch (err) {
        console.log(err);
        error.value = err.message;
        store.dispatch("notification/showNotification", {
          message: err.message,
          status: "danger",
        });
      } finally {
        store.dispatch("loader/hideLoader");
      }
    };

    const loginWithGoogle = async () => {
      store.dispatch("loader/showLoader");
      try {
        await store.dispatch("user/loginWithGoogle");
      } catch (err) {
        console.log(err);
        error.value = err.message;
      } finally{
        store.dispatch("loader/hideLoader");
      }
    };
    return { login, email, password, error, loginWithGoogle };
  },
};
</script>
