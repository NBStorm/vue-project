<template>
  <div class="movie-card">
    <img v-lazy="movie.Poster" alt="Poster">
    <h3>{{ movie.Title }}</h3>
    <p>{{ movie.Year }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.movie-card {
  width: 200px;
  margin: 10px;
}

img {
  width: 100%;
  height: auto;
}
</style>