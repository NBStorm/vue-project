<template>
  <button @click="toggleTheme" class="theme-btn">
    {{ darkMode ? "🌙" : "☀️" }}
  </button>
</template>

<script setup>
import { useThemeStore } from "@/stores/themeStore";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const { darkMode } = storeToRefs(themeStore);
const { toggleTheme } = themeStore;
</script>

<style scoped>
.theme-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 8px 12px;
  border: none;
  border-radius: 50%;
  background: #f0f0f0;
  cursor: pointer;
  font-size: 18px;
  transition: background 0.3s, color 0.3s;
}

.dark .theme-btn {
  background: #333;
  color: white;
}
</style>
