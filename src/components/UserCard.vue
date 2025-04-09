<template>
  <div class="bg-white rounded-2xl shadow p-4">
    <img
      :src="user.picture.large"
      :alt="user.name.first"
      class="w-24 h-24 rounded-full mx-auto mb-2"
    />
    <h2 class="text-xl text-center font-semibold">
      {{ user.name.first }} {{ user.name.last }}
    </h2>
    <p class="text-center text-gray-600">{{ user.email }}</p>
    <p class="text-center text-sm text-gray-500">
      {{ user.location.city }}, {{ user.location.country }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  user: Object,
});
</script>
