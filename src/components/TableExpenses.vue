<template>
  <div>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Search..." />
      <button class="btn btn-primary" type="button">Search</button>
    </div>
    <Table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expense, index) in expenses" :key="index">
          <td>{{ expense.name }}</td>
          <td>{{ expense.category }}</td>
          <td>{{ expense.amount }}</td>
          <td>{{ expense.date }}</td>
          <td>
            <font-awesome-icon
              icon="pencil-square"
              class="me-1 secondary-icon"
              @click="editExpense(expense)"
            />
            <font-awesome-icon
              icon="trash"
              class="me-1 primary-icon"
              @click="deleteExpense(expense.id)"
            />
          </td>
        </tr>
      </tbody>
    </Table>
    <nav aria-label="Table pagination">
      <ul class="pagination justify-content-end">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
            >Previous</a
          >
        </li>
        <li class="page-item active" aria-current="page">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">3</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { VueGoodTable } from "vue-good-table";
export default {
  name: "ExpenseList",
  components: {
    VueGoodTable,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("expenses/fetchExpenses");
    });

    const editExpense = (expense) => {
      // Implement your edit logic here
      console.log("Edit expense:", expense);
    };

    const deleteExpense = (expenseId) => {
      // Implement your delete logic here
      console.log("Delete expense with ID:", expenseId);
      store.dispatch("expenses/deleteExpense", expenseId);
    };
    const expenses = computed(() => store.getters["expenses/expenses"]);
    return {
      expenses,
      editExpense,
      deleteExpense,
    };
  },
};
</script>
<style>
.primary-icon {
  color: red;
}
.secondary-icon {
  color: blue;
}
</style>
