<script setup>
import { ref } from "vue";

const newTask = ref("");
const tasks = ref([]);

const addTask = () => {
  if (newTask.value.trim() !== "") {
    tasks.value.push({ text: newTask.value, completed: false });
    newTask.value = "";
  }
};

const toggleTask = (index) => {
  tasks.value[index].completed = !tasks.value[index].completed;
};

const removeTask = (index) => {
  tasks.value.splice(index, 1);
};
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
    <h1 class="text-xl font-bold mb-4">To-Do List</h1>
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
    <ul>
      <li
        v-for="(task, index) in tasks"
        :key="index"
        class="flex justify-between items-center p-2 border-b"
      >
        <span
          class="text-2xl"
          :class="{ 'line-through text-gray-500': task.completed }"
        >
          {{ task.text }}
        </span>
        <div>
          <button
            @click="toggleTask(index)"
            class="mr-2 text-green-500 hover:text-green-700"
          >
            ✔
          </button>
          <button
            @click="removeTask(index)"
            class="text-red-500 hover:text-red-700"
          >
            ✖
          </button>
        </div>
      </li>
    </ul>
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
