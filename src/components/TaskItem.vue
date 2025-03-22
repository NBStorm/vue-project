<script setup>
defineProps({
  task: Object,
  index: Number,
});

const emit = defineEmits(["toggle-task", "remove-task"]);
</script>

<template>
  <li class="flex justify-between items-center p-2 border-b">
    <div>
      <span
        class="text-2xl cursor-pointer"
        :class="{ 'line-through text-gray-500': task.completed }"
        @click="emit('toggle-task', index)"
      >
        {{ task.text }}
      </span>
      <p class="text-sm italic text-gray-600">
        {{ task.completed ? "Hoàn thành ✅" : "Chưa hoàn thành ⏳" }}
      </p>
    </div>
    <div>
      <button
        @click="emit('toggle-task', index)"
        class="mr-2 text-green-500 hover:text-green-700"
      >
        ✔
      </button>
      <button
        @click="emit('remove-task', index)"
        class="text-red-500 hover:text-red-700"
      >
        ✖
      </button>
    </div>
  </li>
</template>
