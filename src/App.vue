<template>
  <div>
    <NavBar />
    <div class="container mt-5">
      <Loader/>
      <Notification />
      <router-view />
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import Notification from "@/components/Notification.vue";
import Loader from "@/components/Loader.vue";
export default {
  components: {
    NavBar,
    Notification,
    Loader
  },
};
</script>
<style></style>
