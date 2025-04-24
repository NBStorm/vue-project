<template>
  <div>
    <h1>Danh sách người dùng</h1>
    <ul>
      <li v-for="user in users" :key="user.email">
        <router-link :to="`/users/${user.email}`">{{ user.name.first }} {{ user.name.last }}</router-link>
      </li>
    </ul>
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