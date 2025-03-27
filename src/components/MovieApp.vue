<template>
  <div class="w-full max-w-7xl mx-auto bg-gray shadow-2xl rounded-2xl mt-10 p-6 h-fit">
    <input type="text" v-model="searchQuery" placeholder="Nhập tên phim..." @keyup.enter="searchMovies">
    <select v-model="searchType">
      <option value="">All</option>
      <option value="movie">Movie</option>
      <option value="series">Series</option>
      <option value="episode">Episode</option>
    </select>
    <button @click="searchMovies">Tìm kiếm</button>
    <div class="movie-list">
      <MovieCard v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUpdated, onUnmounted, computed} from 'vue';
import axios from 'axios';
import MovieCard from './MovieCard.vue';

const apiKey = 'a5549d08';


onMounted(async () => {
  console.log('Component MovieList mounted');
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=avengers&apikey=${apiKey}`);
    movies.value = response.data.Search;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
});

onUpdated(() => {
  console.log('Component MovieList updated');
});

onUnmounted(() => {
  console.log('Component MovieList unmounted');
});
const movies = ref([]);

const searchQuery = ref('');
const searchType = ref('');

const searchMovies = async () => {
  try {
    const typeParam = searchType.value ? `&type=${searchType.value}` : '';
    const response = await axios.get(`http://www.omdbapi.com/?s=${searchQuery.value || ''}&apikey=${apiKey}${typeParam}`);
    movies.value = response.data.Search || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};
</script>
<style scoped>
.movie-list {
  display: flex;
  flex-wrap: wrap;
}
select option {
  color: gray;
}
</style>