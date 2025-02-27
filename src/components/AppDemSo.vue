<script setup>
import { ref } from "vue";
defineProps({
  msg: String,
});

const count = ref(0);

const increase = () => count.value++;
const decrease = () => count.value--;
const reset = () => (count.value = 0);
</script>

<template>
  <div class="card">
    <h1>
      {{ msg }}
      App đếm số
    </h1>

    <!-- Hiển thị số đếm -->
    <p
      class="text-5xl font-semibold mt-3"
      :class="
        count > 0
          ? 'text-green-500'
          : count < 0
          ? 'text-red-500'
          : 'text-gray-600'
      "
    >
      {{ count }}
    </p>

    <!-- Nút điều khiển -->
    <div class="flex justify-between mt-3">
      <button
        @click="increase"
        class="px-4 py-2 bg-blue-500 text-blue rounded-lg w-15"
      >
        +1
      </button>
      <button
        @click="decrease"
        class="px-4 py-2 bg-red-500 text-blue rounded-lg w-15"
      >
        -1
      </button>
      <button
        @click="reset"
        class="px-4 py-2 bg-gray-500 text-blue rounded-lg w-20"
      >
        Reset
      </button>
    </div>
    <div class="flex justify-evenly">
      <button
        @click="$router.push('/home')"
        class="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Home
      </button>
      <button
        @click="$router.push('/todolist')"
        class="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        To Do List
      </button>
    </div>
  </div>
</template>
