<template>
  <div class="card text-white bg-primary" style="max-width: 18rem;">
    <div class="card-header">
      Summary
    </div>
    <div class="card-body">
      <p>Total Expenses: {{ totalExpenses }}</p>
      <p>Average Expenses: {{ totalIncome }}</p>
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
  },
 
//   onMounted() {
//   this.$store.dispatch('calculateTotalExpenses');
//   console.log('Total Amount:', store.getters);
// },
};
</script>
