<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <Summary :totalExpenses="totalExpenses" :totalIncome="totalIncome" />
      </div>
      <!-- <div class="col-md-3">
        <Summary />
      </div>
      <div class="col-md-3">
        <Summary />
      </div>
      <div class="col-md-3">
        <Summary />
      </div> -->
    </div>
  </div>
  <hr />
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h1>Add Expense</h1>
        <form @submit.prevent="submitExpense" class="mb-4">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              v-model="expense.name"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="category">Category</label>
            <select
              id="category"
              v-model="expense.category"
              class="form-control"
              required
            >
              <option value="" disabled selected>Select a category</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Housing">Housing</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label for="amount">Amount</label>
            <input
              type="number"
              id="amount"
              v-model="expense.amount"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="date">Date</label>
            <input
              type="date"
              id="date"
              v-model="expense.date"
              class="form-control"
              required
            />
          </div>
          <br />
          <button type="submit" class="btn btn-primary">Add Expense</button>
        </form>
      </div>

      <div class="col-md-6">
        <h1>View Expenses {{ store }}</h1>
        <TableExpenses />
        <Pie />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted , computed} from "vue";
import { useStore} from "vuex";
import TableExpenses from "@/components/TableExpenses";
import Summary from "@/components/Summary";
import { VueGoodTable } from 'vue-good-table';
export default {
  name: "ExpenseForm",
  components: {
    TableExpenses,
    Summary,
    VueGoodTable
  },

  setup() {
    const expense = ref({
      name: "",
      category: "",
      amount: "",
      date: "",
    });
    const store = useStore();

    const submitExpense = async () => {
      await store.dispatch("expenses/addExpense", expense.value);
      expense.value.name = "";
      expense.value.category = "";
      expense.value.amount = "";
      expense.value.date = "";
    };
    onMounted(async () => {
      store.dispatch("expenses/calculateTotalExpenses");
    });
    const totalExpenses = computed(() => {
      return store.getters.totalExpenses;
    });

    const chartData = computed(() => {
      return store.getters.categoryTotals.map(category => category.label);
    });
    return {
      expense,
      submitExpense,
      totalExpenses,
      totalIncome: 1000,
      chartData
    };
  },
};
</script>
<style>
.container {
  margin: 2px;
}
</style>
