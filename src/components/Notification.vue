<template>
  <div v-if="message">
    <div :class="`alert alert-${message.status}`" role="alert">
      {{ message.message }}
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  onMounted,
  watch,
} from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Notification",
  props: {},
  setup() {
    const store = useStore();
    const message = computed(() => store.getters["notification/getMessage"]);
    const status = computed(() => store.getters["notification/getStatus"]);

    onMounted(() => {
      // Automatically hide the notification after a certain duration
    });

    watch(message, () => {
      // If the message changes, clear the timeout
    });

    function hideNotification() {
      // Dispatch the 'notification/clearMessage' action to clear the message in the Vuex store
      store.dispatch("notification/clearMessage");
    }

    // onBeforeUnmount(() => {
    //   // Clear the timeout when the component is unmounted to prevent memory leaks
    //   clearTimeout(this.timeout);
    // });

    return {
      message,
      hideNotification,
    };
  },
});
</script>
