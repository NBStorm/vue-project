<template>
  <div>
    <h1>Danh sách bài viết</h1>
    <ul v-if="posts.length > 0">
      <li v-for="post in posts" :key="post.id">
        <router-link :to="'/post/' + post.id">{{ post.title }}</router-link>
      </li>
    </ul>
    <p v-else>Đang tải bài viết...</p>
    <p v-if="error">Đã có lỗi xảy ra khi tải bài viết.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const posts = ref([]);
const error = ref(null);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    posts.value = response.data;
  } catch (err) {
    error.value = err;
    console.error("Lỗi khi tải bài viết:", err);
  }
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: blue;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>