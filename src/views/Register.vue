<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
export default {
  name: 'Register',
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref(null);
    const router = useRouter();
    const store = useStore();
    const register = async () => {
      error.value = null;
      try {
        const userCredential = await store.dispatch('register',{
         email: email.value,
         password: password.value
      });
        console.log(userCredential.user);
        console.log(store);
        router.push('/dashboard');
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
    };
  },
};
</script>