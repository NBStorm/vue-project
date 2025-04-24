<template>
  <div>
    <button @click="$router.go(-1)">Quay lại</button>
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
    </div>
    <p v-else-if="loading">Đang tải chi tiết bài viết...</p>
    <p v-else-if="error">Đã có lỗi xảy ra khi tải chi tiết bài viết.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  const postId = route.params.id;
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    post.value = response.data;
    loading.value = false;
  } catch (err) {
    error.value = err;
    loading.value = false;
    console.error("Lỗi khi tải chi tiết bài viết:", err);
  }
});
</script>