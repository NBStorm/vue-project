<script setup>
import { ref, onMounted, computed } from "vue";
import ProductItem from "../components/ProductItem.vue";
import axios from 'axios'

const products = ref([]);
const searchContent = ref("");
const isFilterOpen = ref(false); // Điều khiển hiển thị filter
const minRating = ref(1);
const maxRating = ref(5);

onMounted(async () => {
  try {
    // const response = await fetch("https://fakestoreapi.com/products");
    // products.value = await response.json();
    // console.log(products);
    const response = await axios.get('https://fakestoreapi.com/products')
    products.value = response.data
  } catch (error) {
    console.error("Lỗi khi fetch API:", error);
  }
});

// Computed property để lọc sản phẩm theo tên
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchContent.value.toLowerCase());
    const matchesRating =
      product.rating.rate >= minRating.value &&
      product.rating.rate <= maxRating.value;
    return matchesSearch && matchesRating;
  });
});
// Hàm Reset Filter
const resetFilters = () => {
  minRating.value = 1;
  maxRating.value = 5;
};
</script>

<template>
    <div
      class="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl mt-10 p-6 h-fit"
    >
    <h1 class="text-3xl font-bold mb-3 text-gray-800 text-center">
      Danh sách sản phẩm
    </h1>

    <div class="flex gap-6">
      <!-- Cột Form (1/3) -->
      <div class="w-1/4 bg-white p-6 rounded-lg shadow h-fit">
        <h2 class="text-2xl text-teal-300 text-center mb-2">Search</h2>
        <!-- <input
          type="text"
          v-model="searchContent"
          placeholder="Tìm kiếm...."
          class="w-full p-2 border rounded-lg mb-2 mt-2"
        />
        <input
          type="text"
          v-model="count"
          placeholder="Số lượng...."
          class="w-full p-2 border rounded-lg mb-2 mt-2"
        />
        <button
          class="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Tìm kiếm
        </button> -->

        <!-- Thanh tìm kiếm -->
        <div class="relative flex items-center border rounded-lg p-2 w-full">
          <input
            type="text"
            v-model="searchContent"
            placeholder="Search..."
            class="w-full outline-none"
          />
          <button @click="isFilterOpen = !isFilterOpen" class="p-2">🔍</button>
          <button v-if="searchContent" @click="searchContent = ''" class="p-2">
            ❌
          </button>
        </div>

        <div
          v-if="isFilterOpen"
          class="absolute bg-white shadow-lg p-4 mt-2 rounded-lg w-64 z-10"
        >
          <h3 class="font-semibold mb-2">Filter</h3>

          <!-- Filter Rating -->
          <div>
            <p class="text-sm font-medium">
              Rating: {{ minRating }} - {{ maxRating }} ⭐
            </p>
            <input
              type="range"
              v-model="minRating"
              min="1"
              max="5"
              step="0.5"
              class="w-full mt-2"
            />
            <input
              type="range"
              v-model="maxRating"
              min="1"
              max="5"
              step="0.5"
              class="w-full mt-2"
            />
          </div>

          <!-- Nút Reset -->
          <button
            @click="resetFilters"
            class="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Cột Danh sách Ghi chú (2/3) -->
      <div class="w-3/4 bg-white p-6 rounded-lg shadow">
        <div
          v-if="filteredProducts.length === 0"
          class="text-gray-500 text-center"
        >
          Không có sản phẩm nào
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
          <ProductItem
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>
