<style scoped>
button:hover {
  opacity: 0.7;
}
</style>
<template>
  <div
    class="max-w-6xl mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-10 text-center"
  >
    <h1 class="text-3xl font-bold mb-6 text-gray-800">
      Chào mừng đến với Ứng dụng
    </h1>
    <p class="text-lg text-gray-600 mb-6">Chọn một tính năng để bắt đầu</p>
    <div class="flex justify-center gap-6">
      <button
        @click="$router.push('/appDemSo')"
        class="px-6 py-3 bg-blue-500 text-white rounded-xl text-lg shadow-md"
      >
        App đếm số
      </button>
      <button
        @click="$router.push('/toDoList')"
        class="px-6 py-3 bg-red-500 text-white rounded-xl text-lg shadow-md"
      >
        To Do List
      </button>
      <button
        @click="$router.push('/productList')"
        class="px-6 py-3 bg-yellow-500 text-white rounded-xl text-lg shadow-md"
      >
        Product List
      </button>
      <button
        @click="$router.push('/noteApp')"
        class="px-6 py-3 bg-green-500 text-white rounded-xl text-lg shadow-md"
      >
        Note App
      </button>
      <button
        @click="$router.push('/expenseTracker')"
        class="px-6 py-3 bg-cyan-500 text-white rounded-xl text-lg shadow-md"
      >
        Expense Tracker
      </button>
      <button
        @click="$router.push('/movieSearch')"
        class="px-6 py-3 bg-amber-500 text-white rounded-xl text-lg shadow-md"
      >
        Movie Search
      </button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
