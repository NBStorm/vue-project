<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">User Management</h1>
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      @click="fetchUsers"
    >
      Load Users
    </button>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UserCard v-for="(user, index) in users" :key="index" :user="user" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UserCard from "@/components/UserCard.vue";

const users = ref([]);

const fetchUsers = async () => {
  const res = await fetch("https://randomuser.me/api/?results=6");
  const data = await res.json();
  users.value = data.results;
};
</script>
