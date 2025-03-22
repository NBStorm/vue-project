<script setup>
defineProps({
  note: Object,
  index: Number,
});

const emit = defineEmits(["delete-note"]);
</script>

<template>
  <div class="bg-yellow-100 p-4 rounded-lg shadow-md w-64">
    <h3 class="text-lg font-semibold truncate">{{ note.title }}</h3>
    <p
      class="text-gray-700 text-sm max-h-24 min-h-16 break-words overflow-hidden"
    >
      {{ note.content }}
    </p>
    <button
      @click="emit('delete-note', index)"
      class="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
    >
      Xóa
    </button>
  </div>
</template>
