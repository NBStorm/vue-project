<template>
  <header
    class="bg-white text-blue-800 fixed top-0 left-0 w-full shadow-md z-50"
  >
    <div class="container mx-auto flex justify-between items-center p-4">
      <!-- Logo -->
      <router-link to="/" class="text-2xl font-bold text-blue-900">
        My App
      </router-link>

      <!-- Menu -->
      <ul class="flex space-x-4">
        <li>
          <router-link
            to="/home"
            class="hover:text-blue-600 transition duration-300"
            >Home</router-link
          >
        </li>
        <li>
          <router-link
            to="/noteapp"
            class="hover:text-blue-600 transition duration-300"
            >Notes</router-link
          >
        </li>
        <li>
          <router-link
            to="/todolist"
            class="hover:text-blue-600 transition duration-300"
            >To Do List</router-link
          >
        </li>
        <li>
          <router-link
            to="/productlist"
            class="hover:text-blue-600 transition duration-300"
            >Product List</router-link
          >
        </li>
        <li>
          <router-link
            to="/expensetracker"
            class="hover:text-blue-600 transition duration-300"
            >Expense Tracker</router-link
          >
        </li>
        <li>
          <router-link
              to="/movieDB"
              class="hover:text-blue-600 transition duration-300"
          >Movie App</router-link
          >
        </li>
        <li>
          <router-link
              to="/users"
              class="hover:text-blue-600 transition duration-300"
          >User Management</router-link
          >
        </li>
        <li>
          <router-link
              to="/theme"
              class="hover:text-blue-600 transition duration-300"
          >Theme Switch</router-link
          >
        </li>
        <li>
          <router-link
              to="/blog"
              class="hover:text-blue-600 transition duration-300"
          >Blog</router-link
          >
        </li>
      </ul>
    </div>
  </header>
</template>
<script setup>
</script>