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
            to="/noteApp"
            class="hover:text-blue-600 transition duration-300"
            >Notes</router-link
          >
        </li>
        <li>
          <router-link
            to="/toDoList"
            class="hover:text-blue-600 transition duration-300"
            >To Do List</router-link
          >
        </li>
        <li>
          <router-link
            to="/productList"
            class="hover:text-blue-600 transition duration-300"
            >Product List</router-link
          >
        </li>
        <li>
          <router-link
            to="/expenseTracker"
            class="hover:text-blue-600 transition duration-300"
            >Expense Tracker</router-link
          >
        </li>
        <li>
          <router-link
            to="/movieSearch"
            class="hover:text-blue-600 transition duration-300"
            >Movie Search</router-link
          >
        </li>
      </ul>
    </div>
  </header>
</template>
