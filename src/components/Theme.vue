<template>
  <div id="app">
    <ThemeSwitcher />
    <h1>Nội dung ứng dụng</h1>
    <p>Đây là nội dung của ứng dụng.</p>
  </div>
</template>

<script>
import ThemeSwitcher from './ThemeSwitcher.vue';

export default {
  components: {
    ThemeSwitcher,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>