<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="border rounded-lg shadow-md p-4 text-center">
    <img
      :src="product.image"
      :alt="product.title"
      class="w-32 h-32 mx-auto object-contain"
    />
    <div class="group">
      <h3
        class="text-lg font-semibold mt-2 line-clamp-1 overflow-hidden text-ellipsis transition-all duration-300 group-hover:line-clamp-none"
      >
        {{ product.title }}
      </h3>
    </div>
    <p class="text-gray-500">${{ product.price }}</p>
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3 hover:bg-blue-600"
    >
      Mua ngay
    </button>
  </div>
</template>
