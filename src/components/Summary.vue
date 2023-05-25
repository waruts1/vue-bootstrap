<template>
  <div class="card text-white bg-primary" style="max-width: 18rem;">
    <div class="card-header">
      {{ title }}
    </div>
    <div class="card-body">
      <p>Total : {{ totalExpenses }}</p>
      <p>Average : {{ totalIncome }}</p>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
  
  props: {
    totalExpenses: {
      type: Number,
      required: true,
    },
    totalIncome: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
 
//   onMounted() {
//   this.$store.dispatch('calculateTotalExpenses');
//   console.log('Total Amount:', store.getters);
// },
};
</script>
