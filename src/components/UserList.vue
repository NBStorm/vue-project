

<template>
  <div
      class="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl mt-10 p-6 h-fit"
  >
    <div>
      <h1 class="text-3xl font-bold mb-3 text-gray-800 text-center">Danh sách người dùng</h1>
      <ul>
        <li v-for="user in users" :key="user.email">
          <router-link :to="`/users/${user.email}`">{{ user.name.first }} {{ user.name.last }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const users = ref([]);

    onMounted(async () => {
      const response = await axios.get('https://randomuser.me/api/?results=10');
      users.value = response.data.results;
    });

    return {
      users,
    };
  },
};
</script>