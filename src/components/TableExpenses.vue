<template>
  <div >
    <vue-good-table :columns="columns" :rows="rows"></vue-good-table>
    <Table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expense, index) in expenses" :key="index">
          <td>{{ expense.name }}</td>
          <td>{{ expense.category }}</td>
          <td>{{ expense.amount }}</td>
          <td>{{ expense.date }}</td>
        </tr>
      </tbody>
    </Table>
  </div>
</template>
  
  <script>
  import { computed,onMounted } from 'vue';
  import { useStore } from "vuex";
  export default {
    name: 'ExpenseList',

  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("expenses/fetchExpenses");
    });
    const expenses = computed(() => store.getters['expenses/expenses']);
    return {
      expenses
  
    };
  },
};
  </script>