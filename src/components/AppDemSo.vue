<script setup>
import { ref } from "vue";

const count = ref(0);
const msg = "App đếm số";

const increase = () => count.value++;
const decrease = () => count.value--;
const reset = () => (count.value = 0);
</script>

<template>
  <div
    class="w-auto bg-white p-6 rounded-lg shadow-md mx-auto text-center mt-20"
  >
    <h1 class="text-2xl font-bold text-gray-800">{{ msg }}</h1>

    <!-- Hiển thị số đếm -->
    <p
      class="text-5xl font-semibold mt-3"
      :class="{
        'text-green-500': count > 0,
        'text-red-500': count < 0,
        'text-gray-600': count === 0,
      }"
    >
      {{ count }}
    </p>

    <!-- Nút điều khiển -->
    <div class="flex justify-center gap-4 mt-3">
      <button
        @click="increase"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg w-20"
      >
        +1
      </button>
      <button
        @click="decrease"
        class="px-4 py-2 bg-red-500 text-white rounded-lg w-20"
      >
        -1
      </button>
      <button
        @click="reset"
        class="px-4 py-2 bg-gray-500 text-white rounded-lg w-24"
      >
        Reset
      </button>
    </div>

    <!-- Điều hướng -->
    <div class="flex justify-center gap-4 mt-4">
      <button
        @click="$router.push('/home')"
        class="px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Home
      </button>
      <button
        @click="$router.push('/todolist')"
        class="px-4 py-2 bg-purple-500 text-white rounded-lg"
      >
        To Do List
      </button>
    </div>
  </div>
</template>
