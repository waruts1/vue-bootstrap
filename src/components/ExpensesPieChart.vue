<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { mapGetters, useStore } from "vuex";
import { Bar } from "vue-chartjs";
import { computed, onMounted } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
// "vue-chartjs": "^5.0.0",
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
export default {
  components: { Bar },

  computed: {
    ...mapGetters("expenses",["categoryTotals"]),
    chartData() {
      return {
        labels: this.categoryTotals.map((category) => category.label),
        datasets: [
          {
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
            data: this.categoryTotals.map((category) => category.value),
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
      };
    },
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("expenses/fetchExpenses");
    });
  },
};
</script>

<style>
canvas {
  width: 300px;
  height: 300px;
}
</style>
