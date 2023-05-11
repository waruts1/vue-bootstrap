<template>
  <div class="container">
    <ExpensesPieChart/>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
      
       
          <div>
            {{ totalExpenses }}
            <div class="card-header">Welcome</div>
            <div class="card-body">
              <div class="alert alert-success" role="alert">
                You are logged in!
                {{ loggedIn }}
                <div class="my-4" v-if="loggedIn.data">
                  <button @click.prevent="signOut" class="btn btn-primary">
                    Log Out
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
          <div role="alert">
            You are not logged in!
            {{ onAuthStateChanged }}
            {{ user }}
            <!-- <PieChart /> -->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onMounted } from "vue";
import ExpensesPieChart from "@/components/ExpensesPieChart";
export default {
  name: "DashboardComponent",
  components: {

    ExpensesPieChart
  },
  setup() {
    //const loggedIn = computed(() => store.state.user.loggedIn);
    const store = useStore();
    const router = useRouter();


    const onAuthStateChanged = (user) => {
      store.dispatch("fetchUser", user);
    };

    const user = computed(() => {
      return store.getters.user;
      
    });
    const totalExpenses = computed(() => {
      return store.getters.totalExpenses;
    });
    onMounted(() => {
      console.log(store);
      store.getters.categoryTotals;
    })

    const signOut = async () => {
      await store.dispatch("logOut");
      router.push("/");
    };

    return { user, signOut, onAuthStateChanged };
  },
};
</script>
