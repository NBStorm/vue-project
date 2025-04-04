<script setup>
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import { useThemeStore } from "@/stores/themeStore";
import HeaderHome from "@/components/Header.vue";

// Khởi tạo theme khi app mount
useThemeStore();
</script>

<template>
  <HeaderHome />
  <router-view />
  <ThemeSwitcher />
</template>
