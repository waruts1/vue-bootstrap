<template>
    {{ message }}
<div v-if="isLoading" class="d-flex justify-content-center danger">
  <div class="spinner-border" role="status">
    <font-awesome-icon icon="hourglass" class="me-1" />
  </div>
</div>
</template>

<script>
import { computed } from "vue";
import { useStore,mapGetters } from "vuex";

export default {
  name: "Loader",
  computed: {
    ...mapGetters('loader', ['isLoading']),
  },
};
</script>

<style>
.loader {
  /* Your loader styles here */
}
</style>
