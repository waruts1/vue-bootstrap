<template>
  <nav class="navbar navbar-expand navbar-dark bg-danger">
    <a href="https://vuejs.org" class="navbar-brand ms-1">
      <img :src="require('@/assets/logo.png')" height="40" />
    </a>
    <div class="navbar-nav me-auto">
      <li class="nav-item">
        <router-link
          to="/admin"
          class="nav-link nav-link-white"
          :active-class="'active'"
        >
          Admin
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/"
          class="nav-link nav-link-white"
          :active-class="'active'"
        >
          Home
        </router-link>
      </li>
    </div>
    <div class="navbar-nav ms-auto">
      <li class="nav-item">
        <router-link
          to="/savings"
          class="nav-link nav-link-white"
          :active-class="'active'"
        >
          Savings 
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/expenses"
          class="nav-link nav-link-white"
          :active-class="'active'"
        >
          Expenses 
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/login"
          class="nav-link nav-link-white"
          :active-class="'active'"
        >
          Login
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/register"
          class="nav-link nav-link-white"
          :active-class="'active'"
        >
          Register
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/dashboard"
          class="nav-link nav-link-white"
          :active-class="'active'"
        >
          Dashboard
        </router-link>
      </li>
      <li class="nav-item" >
        <!-- <a @click="signOut" class="nav-link nav-link-white"> SignOut </a> -->
      </li>
    </div>
  </nav>
</template>
<!-- <script> -->

<!-- // import { useRouter } from "vue-router";
// import { useStore } from "vuex";
// import { computed } from 'vue';
// export default {
//   setup() {

//     const router = useRouter()
//     const store = useStore()
//    const loggedIn = computed(() => store.state.user.loggedIn);

//     const signOut = async () => {
//       console.log(loggedIn);
//       try {
        
//         await store.dispatch('logOut')
//         router.push('/')
//       } catch (err) {
//         console.log(err)
//         //error.value = err.message
//       }
//     }

//     return {signOut, loggedIn }
//   }
// }
// </script>
// <style scoped>
// .nav-link-white {
//   color: white;
// }
// </style> -->
