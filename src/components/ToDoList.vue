<script setup>
import { ref } from "vue";
import TaskItem from "./TaskItem.vue"; // Import component con

const newTask = ref("");
const tasks = ref([]);
const errorMessage = ref(""); // Biến lưu thông báo lỗi

const addTask = () => {
  if (newTask.value.trim() === "") {
    errorMessage.value = "Vui lòng nhập công việc! 🚨";
    setTimeout(() => {
      errorMessage.value = ""; // Ẩn thông báo sau 3 giây
    }, 3000);
    return;
  }

  tasks.value.push({ text: newTask.value, completed: false });
  newTask.value = "";
};

const toggleTask = (index) => {
  tasks.value[index].completed = !tasks.value[index].completed;
};

const removeTask = (index) => {
  tasks.value.splice(index, 1);
};
</script>

<template>
  <div class="w-3/6 mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
    <h1 class="text-xl font-bold mb-4">To-Do List</h1>

    <!-- Hiển thị thông báo lỗi -->
    <p v-if="errorMessage" class="text-red-500 text-sm mb-2">
      {{ errorMessage }}
    </p>

    <div class="flex mb-4">
      <input
        v-model="newTask"
        type="text"
        placeholder="Nhập công việc..."
        class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring"
      />
      <button
        @click="addTask"
        class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Thêm
      </button>
    </div>

    <!-- Table -->
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border p-2">#</th>
          <th class="border p-2">Công việc</th>
          <th class="border p-2">Trạng thái</th>
          <th class="border p-2">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(task, index) in tasks"
          :key="index"
          class="hover:bg-gray-100"
        >
          <td class="border p-2 text-center">{{ index + 1 }}</td>
          <td class="border p-2">{{ task.text }}</td>
          <td class="border p-2 text-center">
            <span
              :class="task.completed ? 'text-green-600' : 'text-red-500'"
              class="font-semibold"
            >
              {{ task.completed ? "Hoàn thành" : "Chưa hoàn thành" }}
            </span>
          </td>
          <td class="border p-2 text-center">
            <button
              @click="toggleTask(index)"
              class="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
            >
              Đổi trạng thái
            </button>
            <button
              @click="removeTask(index)"
              class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-evenly">
      <button
        @click="$router.push('/home')"
        class="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Home
      </button>
      <button
        @click="$router.push('/appdemso')"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        App Đếm Số
      </button>
    </div>
  </div>
</template>
