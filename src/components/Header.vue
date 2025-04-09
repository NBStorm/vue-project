<template>
  <header
    class="bg-white dark:bg-gray-800 text-blue-800 dark:text-gray-200 fixed top-0 left-0 w-full shadow-md z-50 transition-colors duration-300"
  >
    <div class="container mx-auto flex justify-between items-center p-4">
      <!-- Logo -->
      <router-link
        to="/"
        class="text-2xl font-bold text-blue-900 dark:text-white transition-colors duration-300"
      >
        My App
      </router-link>

      <!-- Menu -->
      <ul class="flex space-x-4">
        <li v-for="(link, index) in links" :key="index">
          <router-link
            :to="link.to"
            class="text-blue-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white transition-colors duration-300"
          >
            {{ link.text }}
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
const links = [
  { to: "/home", text: "Home" },
  { to: "/noteApp", text: "Notes" },
  { to: "/toDoList", text: "To Do List" },
  { to: "/productList", text: "Product List" },
  { to: "/expenseTracker", text: "Expense Tracker" },
  { to: "/movieSearch", text: "Movie Search" },
];
</script>
