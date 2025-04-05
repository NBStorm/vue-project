import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(false);

  // Khởi tạo theme
  const initTheme = () => {
    try {
      // Kiểm tra localStorage
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        isDark.value = savedTheme === "dark";
      } else {
        // Nếu không có localStorage, dùng system preference
        isDark.value = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
      }
      updateTheme();
    } catch (error) {
      console.error("Error initializing theme:", error);
    }
  };

  const toggleDark = () => {
    isDark.value = !isDark.value;
    updateTheme();
  };

  const updateTheme = () => {
    try {
      document.documentElement.classList.toggle("dark", isDark.value);
      localStorage.setItem("theme", isDark.value ? "dark" : "light");
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };

  // Khởi tạo theme ngay khi store được tạo
  initTheme();

  return {
    isDark,
    toggleDark,
  };
});
