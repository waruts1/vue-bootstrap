<template>
  <nav class="navbar navbar-expand navbar-dark bg-danger">
    <a href="https://vuejs.org" class="navbar-brand ms-1">
      <img :src="require('@/assets/logo.png')" height="40" />
    </a>
    <div class="navbar-nav me-auto">
      <li class="nav-item" v-if="user">
        <router-link
          to="/admin"
          class="nav-link nav-link-white"
          :active-class="'active'"
        >
        <font-awesome-icon icon="pie-chart" class="me-1" />
          Admin
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/"
          class="nav-link nav-link-white"
          :active-class="'active'"
        >
        <font-awesome-icon icon="home" class="me-1" />
          Home
        </router-link>
      </li>
    </div>
    <div class="navbar-nav ms-auto">
      <li class="nav-item" v-if="user">
        <router-link
          to="/savings"
          class="nav-link nav-link-white"
          :active-class="'active'"
        >
        <font-awesome-icon icon="envelope" class="me-1" />
          Savings
        </router-link>
      </li>
      <li class="nav-item" v-if="user">
        <router-link
          to="/expenses"
          class="nav-link nav-link-white"
          :active-class="'active'"
        >
        <font-awesome-icon icon="credit-card" class="me-1" />
          Expenses
        </router-link>
      </li>
      <li class="nav-item" v-if="!user">
        <router-link
          to="/login"
          class="nav-link nav-link-white"
          :active-class="'active'"
        >
        <font-awesome-icon icon="sign-in" class="me-1" />
          Login
        </router-link>
      </li>
      <li class="nav-item" v-if="!user">
        <router-link
          to="/register"
          class="nav-link nav-link-white"
          :active-class="'active'"
        >
        <font-awesome-icon icon="user-plus" class="me-1" />
          Register
        </router-link>
      </li>
      <li class="nav-item" v-if="user">
        <router-link
          to="/loans"
          class="nav-link nav-link-white"
          :active-class="'active'"
        >
        <font-awesome-icon icon="money-bill" class="me-1" />
          Loans
        </router-link>
      </li>
      <li class="nav-item" v-if="user">
        <router-link
          to="/dashboard"
          class="nav-link nav-link-white"
          :active-class="'active'"
        >
        <font-awesome-icon icon="tachometer" class="me-1" />
          Dashboard
        </router-link>
      </li>
      <li class="nav-item" v-if="user">
        <a @click="signOut" class="nav-link nav-link-white">  <font-awesome-icon icon="sign-out" class="me-1" /> SignOut </a>
      </li>
    </div>
  </nav>
</template>
<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const router = useRouter();

    const store = useStore();

    const user = computed(() => {
      const userObject = store.getters["user/user"];
      const values = Object.values(userObject);
      return values.some((value) => !!value);
    });

    const signOut = async () => {
      try {
        await store.dispatch("user/logOut");
        router.push("/");
      } catch (err) {
        console.log(err);
        //error.value = err.message
      }
    };

    return { signOut, user };
  },
};
</script>
<style scoped>
.nav-link-white {
  color: black;
}
.active-class {
  color: yellow;
}
</style>
