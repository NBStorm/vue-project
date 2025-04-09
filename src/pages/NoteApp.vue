<script setup>
import { ref } from "vue";
import NoteItem from "../components/NoteItem.vue";

const newTitle = ref("");
const newContent = ref("");
const notes = ref([]);
const errorMessage = ref("");

const addNote = () => {
  if (newTitle.value.trim() === "" || newContent.value.trim() === "") {
    errorMessage.value = "Vui lòng nhập tiêu đề và nội dung!";
    setTimeout(() => (errorMessage.value = ""), 3000);
    return;
  }

  notes.value.push({ title: newTitle.value, content: newContent.value });
  newTitle.value = "";
  newContent.value = "";
};

const deleteNote = (index) => {
  notes.value.splice(index, 1);
};
</script>

<template>
  <div
    class="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl mt-10 p-6 h-fit"
  >
    <h1 class="text-3xl font-bold mb-3 text-gray-800 text-center">Note App</h1>

    <!-- Bố cục 1/3 và 2/3 -->
    <div class="flex gap-6">
      <!-- Cột Form (1/3) -->
      <div class="w-1/4 bg-gray-50 p-6 rounded-lg shadow">
        <p v-if="errorMessage" class="text-red-500 text-sm mb-2">
          {{ errorMessage }}
        </p>

        <input
          v-model="newTitle"
          type="text"
          placeholder="Tiêu đề..."
          class="w-full p-2 border rounded-lg mb-2"
        />
        <textarea
          v-model="newContent"
          placeholder="Nội dung ghi chú..."
          class="w-full p-2 border rounded-lg mb-2"
        ></textarea>
        <button
          @click="addNote"
          class="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Thêm ghi chú
        </button>
      </div>

      <!-- Cột Danh sách Ghi chú (2/3) -->
      <div class="w-3/4 bg-white p-6 rounded-lg shadow">
        <div v-if="notes.length === 0" class="text-gray-500 text-center">
          Chưa có ghi chú nào
        </div>

        <div class="flex flex-wrap gap-3 justify-center">
          <NoteItem
            v-for="(note, index) in notes"
            :key="index"
            :note="note"
            :index="index"
            @delete-note="deleteNote"
          />
        </div>
      </div>
    </div>
  </div>
</template>
