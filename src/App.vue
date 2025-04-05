<script setup>
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import HeaderHome from "@/components/Header.vue";
import { useThemeStore } from "@/stores/themeStore";

const themeStore = useThemeStore();
</script>

<template>
  <HeaderHome />
  <router-view />
  <ThemeSwitcher />
</template>
