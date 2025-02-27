<template>
  <div
    class="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-10 text-center"
  >
    <h1 class="text-3xl font-bold mb-6 text-gray-800">
      Chào mừng đến với Ứng dụng
    </h1>
    <p class="text-lg text-gray-600 mb-6">Chọn một tính năng để bắt đầu</p>
    <div class="flex justify-center gap-6">
      <button
        @click="$router.push('/appdemso')"
        class="px-6 py-3 bg-blue-500 text-white rounded-xl text-lg shadow-md hover:bg-blue-600 transition"
      >
        App đếm số
      </button>
      <button
        @click="$router.push('/todolist')"
        class="px-6 py-3 bg-red-500 text-white rounded-xl text-lg shadow-md hover:bg-red-600 transition"
      >
        To Do List
      </button>
      <button
        @click="$router.push('/bt2')"
        class="px-6 py-3 bg-yellow-500 text-white rounded-xl text-lg shadow-md hover:bg-red-600 transition"
      >
        Bài tập tuần 2
      </button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
