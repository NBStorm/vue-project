import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const darkMode = ref(JSON.parse(localStorage.getItem("darkMode")) ?? false);

  const toggleTheme = () => {
    darkMode.value = !darkMode.value;
  };

  // Cập nhật class cho root element & localStorage khi darkMode thay đổi
  watch(
    darkMode,
    (newVal) => {
      localStorage.setItem("darkMode", JSON.stringify(newVal));
      document.documentElement.classList.toggle("dark", newVal);
    },
    { immediate: true }
  );

  return { darkMode, toggleTheme };
});
