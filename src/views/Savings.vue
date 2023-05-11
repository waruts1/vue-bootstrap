<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Launch demo modal
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addSaving">
              <div>
                <label for="title">Title</label>
                <input
                  type="text"
                  id="title"
                  v-model="newSaving.title"
                  required
                />
              </div>
              <div>
                <label for="amount">Amount</label>
                <input
                  type="number"
                  id="amount"
                  v-model="newSaving.amount"
                  required
                />
              </div>
              <div>
                <label for="date">Date</label>
                <input
                  type="date"
                  id="date"
                  v-model="newSaving.date"
                  required
                />
              </div>
              <button type="submit">Add Saving</button>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <h1>Savings</h1>
    <button data-bs-target="#exampleModal">Add Saving</button>
    <h2>Add Saving</h2>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <form @submit.prevent="addSaving">
        <div>
          <label for="title">Title</label>
          <input type="text" id="title" v-model="newSaving.title" required />
        </div>
        <div>
          <label for="amount">Amount</label>
          <input
            type="number"
            id="amount"
            v-model="newSaving.amount"
            required
          />
        </div>
        <div>
          <label for="date">Date</label>
          <input type="date" id="date" v-model="newSaving.date" required />
        </div>
        <button type="submit">Add Saving</button>
      </form>
    </div>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="saving in savings" :key="saving.id">
          <td>{{ saving.title }}</td>
          <td>{{ saving.amount }}</td>
          <td>{{ saving.date }}</td>
          <td>
            <button @click="deleteSaving(saving.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {  useStore } from 'vuex';
import {ref} from 'vue';
export default {
  name: 'Savings',
  
  setup() {
    const store = useStore();
    const newSaving = ref({
      title: '',
      amount: '',
      date: '',
    });
    const showModal = ref(false);
    
    const savings = computed(() => store.state.savings);
    
    const addSaving = () => {
      store.dispatch('savings/addSaving', newSaving.value);
      newSaving.value.title = '';
      newSaving.value.amount = '';
      newSaving.value.date = '';
      showModal.value = false;
    };
    
    const deleteSaving = (savingId) => {
      store.dispatch('savings/deleteSaving', savingId);
    };
    
    const closeModal = () => {
      showModal.value = false;
    };
    
    onMounted(() => {
      store.dispatch('savings/fetchSavings');
    });
    
    return {
      newSaving,
      showModal,
      savings,
      addSaving,
      deleteSaving,
      closeModal,
    };
  },
};

</script>


