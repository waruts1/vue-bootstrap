<template>
  <div>
    <!-- Display a button to open the modal -->
    <button class="btn btn-primary" @click="showModal = true">Add Loan</button>

    <!-- Modal -->
    <div v-if="showModal" class="modal fade show" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Form to create a new loan -->
          <form @submit.prevent="createLoan">
            <div class="modal-header">
              <h5 class="modal-title">Add Loan</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="loanName" class="form-label">Loan Name</label>
                <input type="text" class="form-control" id="loanName" v-model="newLoan.name" placeholder="Loan name" required>
              </div>
              <div class="mb-3">
                <label for="loanAmount" class="form-label">Loan Amount</label>
                <input type="number" class="form-control" id="loanAmount" v-model="newLoan.amount" placeholder="Loan amount" required>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Create Loan</button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            </div>
          </form>
        </div>
      </div>

      <table class="table mt-3">
      <thead>
        <tr>
          <th>Loan Name</th>
          <th>Loan Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="loan in loans" :key="loan.id">
          <td>{{ loan.name }}</td>
          <td>{{ loan.amount }}</td>
          <td>
            <button class="btn btn-danger btn-sm" @click="deleteLoan(loan.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>

    <!-- Display a list of loans -->
    <ul class="list-group mt-3">
      <li class="list-group-item" v-for="loan in loans" :key="loan.id">
        {{ loan.name }} - {{ loan.amount }}
        <button class="btn btn-danger btn-sm" @click="deleteLoan(loan.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'LoanList',
  setup() {
    const store = useStore();
    const showModal = ref(false);

    // Get the loans from the Vuex store
    const loans = computed(() => store.getters['loans/getLoans']);

    // Data for creating a new loan
    const newLoan = {
      name: '',
      amount: '',
    };

    // Create a new loan
    const createLoan = () => {
      store.dispatch('loans/createLoan', newLoan);
      newLoan.name = '';
      newLoan.amount = '';
      closeModal();
    };

    // Delete a loan
    const deleteLoan = (loanId) => {
      store.dispatch('loans/deleteLoan', loanId);
    };

    // Close the modal
    const closeModal = () => {
      showModal.value = false;
    };

    return {
      loans,
      newLoan,
      showModal,
      createLoan,
      deleteLoan,
      closeModal,
    };
  },
};
</script>

<style>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  margin-top: 10%;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
