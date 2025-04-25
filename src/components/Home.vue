<style scoped>
/* Remove old button:hover style since we're using Tailwind classes now */
</style>

<template>
  <div
    class="max-w-6xl mx-auto p-8 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl mt-10 text-center transition-colors duration-300"
  >
    <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
      Chào mừng đến với Ứng dụng
    </h1>
    <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
      Chọn một tính năng để bắt đầu
    </p>
    <div class="flex justify-center gap-6 mb-6">
      <button
        @click="$router.push('/appDemSo')"
        class="px-6 py-3 bg-blue-500 dark:bg-blue-600 text-white rounded-xl text-lg shadow-md hover:opacity-80 transition-opacity"
      >
        App đếm số
      </button>
      <button
        @click="$router.push('/toDoList')"
        class="px-6 py-3 bg-red-500 dark:bg-red-600 text-white rounded-xl text-lg shadow-md hover:opacity-80 transition-opacity"
      >
        To Do List
      </button>
      <button
        @click="$router.push('/productList')"
        class="px-6 py-3 bg-yellow-500 dark:bg-yellow-600 text-white rounded-xl text-lg shadow-md hover:opacity-80 transition-opacity"
      >
        Product List
      </button>
      <button
        @click="$router.push('/noteApp')"
        class="px-6 py-3 bg-green-500 dark:bg-green-600 text-white rounded-xl text-lg shadow-md hover:opacity-80 transition-opacity"
      >
        Note App
      </button>
    </div>
    <div class="flex justify-center gap-6">
      <button
        @click="$router.push('/expenseTracker')"
        class="px-6 py-3 bg-cyan-500 dark:bg-cyan-600 text-white rounded-xl text-lg shadow-md hover:opacity-80 transition-opacity"
      >
        Expense Tracker
      </button>
      <button
        @click="$router.push('/movieSearch')"
        class="px-6 py-3 bg-amber-500 dark:bg-amber-600 text-white rounded-xl text-lg shadow-md hover:opacity-80 transition-opacity"
      >
        Movie Search
      </button>
      <button
        @click="$router.push('/userManager')"
        class="px-6 py-3 bg-amber-700 dark:bg-amber-800 text-white rounded-xl text-lg shadow-md hover:opacity-80 transition-opacity"
      >
        User Manager
      </button>
      <button
        @click="$router.push('/blogApp')"
        class="px-6 py-3 bg-amber-700 dark:bg-amber-800 text-white rounded-xl text-lg shadow-md hover:opacity-80 transition-opacity"
      >
        Blog App
      </button>
    </div>    
  </div>
</template>

<script setup>
import { useThemeStore } from "../stores/themeStore";

const themeStore = useThemeStore();
</script>

<style></style>
