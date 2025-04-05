<script setup>
import { useThemeStore } from "../stores/themeStore";
import { storeToRefs } from "pinia";

const store = useThemeStore();
const { isDark } = storeToRefs(store);
const { toggleDark } = store;
</script>

<template>
  <button
    @click="toggleDark"
    class="fixed bottom-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-800 text-lg"
  >
    {{ isDark ? "🌙" : "☀️" }}
  </button>
</template>
