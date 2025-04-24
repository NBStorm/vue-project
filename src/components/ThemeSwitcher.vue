<template>
  <div>
    <button @click="themeStore.toggleTheme">
      {{ themeStore.isDarkMode ? 'Chế độ sáng' : 'Chế độ tối' }}
    </button>
  </div>
</template>

<script>
import { useThemeStore } from '../theme.js'; // Đảm bảo đường dẫn đúng

export default {
  setup() {
    const themeStore = useThemeStore();

    // Khởi tạo theme khi component được mount
    themeStore.initTheme();

    return { themeStore };
  },
};
</script>

<style>
body {
  transition: background-color 0.3s ease;
}

body.dark-mode {
  background-color: #333;
  color: #eee;
}
</style>