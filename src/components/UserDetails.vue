<template>
  <div>
    <h1>Chi tiết người dùng</h1>
    <div v-if="user">
      <img :src="user.picture.large" alt="Ảnh đại diện" />
      <p>Họ và tên: {{ user.name.first }} {{ user.name.last }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Địa chỉ: {{ user.location.street.number }} {{ user.location.street.name }}, {{ user.location.city }}, {{ user.location.country }}</p>
    </div>
    <div v-else>
      <p>Đang tải thông tin người dùng...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const user = ref(null);
    const route = useRoute();
    const userEmail = route.params.email;

    onMounted(async () => {
      const response = await axios.get(`https://randomuser.me/api/?email=${userEmail}`);
      user.value = response.data.results[0];
    });

    return {
      user,
    };
  },
};
</script>