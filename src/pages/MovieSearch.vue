<template>
  <div
    class="w-full max-w-7xl mx-auto bg-gray-900 text-white shadow-2xl rounded-2xl mt-10 p-6 h-fit dark:bg-white"
  >
    <h1 class="text-3xl font-bold text-center mb-6 dark:text-black">Movie Search</h1>

    <div class="flex justify-center mb-6">
      <input
        v-model="searchQuery"
        @input="debouncedFetch"
        placeholder="Search for a movie..."
        class="px-4 py-2 w-1/2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none"
      />
      <button
        @click="fetchMovies"
        class="ml-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Search
      </button>
    </div>

    <div v-if="loading" class="text-center text-gray-400">Loading...</div>
    <div v-if="error" class="text-center text-red-500">{{ error }}</div>

    <div
      v-if="movies.length"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="movie in movies"
        :key="movie.imdbID"
        class="bg-gray-800 p-4 rounded-lg shadow-lg transition transform hover:scale-105"
      >
        <img
          :src="movie.Poster"
          alt="Movie Poster"
          class="w-full h-64 object-cover rounded-lg"
          loading="lazy"
        />
        <h2 class="text-lg font-semibold mt-2">{{ movie.Title }}</h2>
        <p class="text-gray-400">{{ movie.Year }}</p>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="flex justify-center items-center mt-6 space-x-2"
    >
      <!-- Nút Previous -->
      <button
        @click="changePage(page - 1)"
        :disabled="page === 1"
        class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition duration-200"
      >
        Previous
      </button>

      <button
        v-for="n in displayedPages()"
        :key="n"
        @click="changePage(n)"
        :disabled="n === '...'"
        :class="{
          'bg-blue-500 text-white': n === page,
          'bg-gray-700 hover:bg-gray-600': n !== page && n !== '...',
          'cursor-default': n === '...',
        }"
        class="px-4 py-2 rounded-lg transition duration-200"
      >
        {{ n }}
      </button>

      <!-- Nút Next -->
      <button
        @click="changePage(page + 1)"
        :disabled="page === totalPages"
        class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition duration-200"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import _ from "lodash";

export default {
  setup() {
    const YOUR_OMDB_API_KEY = "ac6f95fd";
    const searchQuery = ref("Titanic");
    const movies = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const page = ref(1);
    const totalResults = ref(0);
    const moviesPerPage = 8;
    const totalPages = ref(0);

    const fetchMovies = async () => {
      if (!searchQuery.value.trim()) return;
      loading.value = true;
      error.value = null;
      movies.value = [];

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${YOUR_OMDB_API_KEY}&s=${searchQuery.value}&page=${page.value}`
        );
        const data = await response.json();
        console.log("API Response:", data);

        if (Array.isArray(data.Search)) {
          movies.value = data.Search.slice(0, moviesPerPage);
          totalResults.value = parseInt(data.totalResults) || 0;
          totalPages.value = Math.ceil(totalResults.value / moviesPerPage);
        } else {
          error.value = data.Error || "No results found";
        }
      } catch (err) {
        error.value = "Something went wrong";
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchMovies);
    watch(searchQuery, () => {
      page.value = 1;
      debouncedFetch();
    });

    const debouncedFetch = _.debounce(fetchMovies, 500);

    const changePage = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages.value) {
        page.value = newPage;
        fetchMovies();
      }
    };

    const displayedPages = () => {
      let pages = [];
      if (totalPages.value <= 5) {
        return Array.from({ length: totalPages.value }, (_, i) => i + 1);
      }

      pages.push(1); // Page đầu tiên
      if (page.value > 3) pages.push("..."); // Dấu "..."

      const start = Math.max(2, page.value - 1);
      const end = Math.min(totalPages.value - 1, page.value + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page.value < totalPages.value - 2) pages.push("...");
      pages.push(totalPages.value); // Page cuối

      return pages;
    };

    return {
      searchQuery,
      movies,
      loading,
      error,
      fetchMovies,
      debouncedFetch,
      page,
      totalResults,
      totalPages,
      changePage,
      displayedPages,
    };
  },
};
</script>
