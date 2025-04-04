// stores/themeStore.js
import { defineStore } from "pinia";

export const useThemeStoreChatGPT = defineStore("theme", {
  state: () => ({
    isDarkMode: false, // Trạng thái mặc định là chế độ sáng
  }),
  actions: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      // Lưu trạng thái vào localStorage để giữ lại khi reload trang
      localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");
    },
    loadTheme() {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        this.isDarkMode = savedTheme === "dark";
      }
    },
  },
});
