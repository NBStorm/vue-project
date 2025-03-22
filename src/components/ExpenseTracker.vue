<script setup>
import { ref, computed, onMounted, watch } from "vue";
import Chart from "chart.js/auto";

const transactions = ref([]);
const showModal = ref(false);

const form = ref({ amount: "", category: "", type: "income" });
const chartCanvas = ref(null);
let chartInstance = null;

const resetForm = () => {
  form.value = { amount: "", category: "", type: "income" };
  showModal.value = false;
};

const handleSubmit = () => {
  if (
    !form.value.amount ||
    (form.value.type === "expense" && !form.value.category) ||
    (form.value.type === "expense" && form.value.amount > balance.value)
  )
    return;
  transactions.value.push({
    id: transactions.value.length + 1,
    type: form.value.type,
    amount: parseFloat(form.value.amount),
    category: form.value.category || "Income",
    month: "March",
  });
  resetForm();
};

const income = computed(
  () =>
    transactions.value
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0) || 0
);
const expenses = computed(
  () =>
    transactions.value
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0) || 0
);
const balance = computed(() => income.value - expenses.value);

const expenseCategories = computed(() => {
  const categories = {};
  transactions.value
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });
  return categories;
});

const updateChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }
  chartInstance = new Chart(chartCanvas.value, {
    type: "doughnut",
    data: {
      labels: Object.keys(expenseCategories.value),
      datasets: [
        {
          label: "Expenses by Category",
          data: Object.values(expenseCategories.value),
          backgroundColor: [
            "#f87171",
            "#fb923c",
            "#facc15",
            "#4ade80",
            "#38bdf8",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true } },
    },
  });
};

onMounted(updateChart);
watch([transactions], updateChart, { deep: true });
</script>

<style scoped>
button:hover {
  opacity: 0.8;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>

<template>
  <div
    class="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl mt-10 p-6 h-fit"
  >
    <h2 class="text-2xl font-bold pb-2.5">Expense Tracker</h2>
    <p class="text-lg">Balance: ${{ balance }}</p>
    <p class="text-green-500">Income: ${{ income }}</p>
    <p class="text-red-500">Expenses: ${{ expenses }}</p>

    <div class="my-4 flex justify-center">
      <div class="w-70 h-70s">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>

    <button
      @click="showModal = true"
      class="w-full bg-blue-500 text-white px-4 py-2 rounded"
    >
      Add Transaction
    </button>

    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-md"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          @click="resetForm"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h3 class="text-xl font-semibold mb-4">Add Transaction</h3>
        <form @submit.prevent="handleSubmit">
          <label class="block mb-2">Amount:</label>
          <input
            v-model="form.amount"
            type="number"
            class="w-full p-2 border rounded mb-4"
            required
            :disabled="balance < 0 && form.type === 'expense'"
          />
          <p
            v-if="form.type === 'expense' && form.amount > balance"
            class="text-red-500 text-sm"
          >
            Expense cannot exceed balance.
          </p>

          <label class="block mb-2">Type:</label>
          <select
            v-model="form.type"
            class="w-full p-2 border rounded mb-4"
            :disabled="balance < 0 && form.type === 'expense'"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <div v-if="form.type === 'expense'">
            <label class="block mb-2">Category:</label>
            <input
              v-model="form.category"
              type="text"
              class="w-full p-2 border rounded mb-4"
              required
              :disabled="balance < 0 && form.type === 'expense'"
            />
          </div>

          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="resetForm"
              class="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded"
              :disabled="
                (balance < 0 && form.type === 'expense') ||
                (form.type === 'expense' && form.amount > balance)
              "
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
