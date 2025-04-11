<!-- components/UserModal.vue -->
<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-opacity-40 backdrop-blur-md flex items-center justify-center z-50"
  >
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4 dark:text-white">
        {{ isEditMode ? "Edit User" : "View User" }}
      </h2>

      <div class="space-y-4">
        <div class="flex items-center space-x-4">
          <img
            :src="currentUser.picture.large"
            alt="User"
            class="w-20 h-20 rounded-full"
          />
          <div>
            <h3 class="text-lg font-semibold dark:text-white">
              {{ currentUser.name.first }} {{ currentUser.name.last }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ currentUser.email }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >First Name</label
            >
            <input
              v-model="currentUser.name.first"
              :readonly="!isEditMode"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Last Name</label
            >
            <input
              v-model="currentUser.name.last"
              :readonly="!isEditMode"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Email</label
          >
          <input
            v-model="currentUser.email"
            :readonly="!isEditMode"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Phone</label
          >
          <input
            v-model="currentUser.phone"
            :readonly="!isEditMode"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >City</label
            >
            <input
              v-model="currentUser.location.city"
              :readonly="!isEditMode"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Country</label
            >
            <input
              v-model="currentUser.location.country"
              :readonly="!isEditMode"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-end space-x-3">
        <button
          v-if="isEditMode"
          @click="saveChanges"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
        <button
          @click="closeModal"
          class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  isOpen: Boolean,
  user: Object,
  isEditMode: Boolean,
});

const emit = defineEmits(["close", "save"]);

const currentUser = ref(JSON.parse(JSON.stringify(props.user)));

const closeModal = () => {
  emit("close");
};

const saveChanges = () => {
  emit("save", currentUser.value);
};
</script>
