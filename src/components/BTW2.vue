<script setup>
import { ref } from "vue";

const products = ref([
  { name: "Sản phẩm 1", price: 100000, description: "Mô tả sản phẩm 1" },
  { name: "Sản phẩm 2", price: 200000, description: "Mô tả sản phẩm 2" },
  { name: "Sản phẩm 3", price: 300000, description: "Mô tả sản phẩm 3" },
]);

const selectedProduct = ref(null);

const selectProduct = (product) => {
  selectedProduct.value = product;
};
</script>

<style scoped></style>

<template>
  <div
    class="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-10 text-center"
  >
    <h2 class="text-4xl font-bold mb-4">Danh Sách Sản Phẩm</h2>
    <ul>
      <li
        v-for="(product, index) in products"
        :key="index"
        class="flex justify-between items-center p-2 border-b cursor-pointer hover:bg-gray-100 text-lg"
        @click="selectProduct(product)"
      >
        {{ product.name }} - {{ product.price }} VND
      </li>
    </ul>

    <div v-if="selectedProduct" class="mt-4 p-4 border rounded-lg bg-gray-50">
      <h3 class="text-xl font-semibold">Chi Tiết Sản Phẩm</h3>
      <p class="text-lg"><strong>Tên:</strong> {{ selectedProduct.name }}</p>
      <p class="text-lg">
        <strong>Giá:</strong> {{ selectedProduct.price }} VND
      </p>
      <p class="text-lg">
        <strong>Mô tả:</strong> {{ selectedProduct.description }}
      </p>
      <button
        @click="selectedProduct = null"
        class="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg"
      >
        Đóng
      </button>
    </div>
    <button
      @click="$router.push('/')"
      class="mt-6 px-6 py-3 bg-gray-500 text-white rounded-xl text-lg shadow-md hover:bg-gray-600 transition"
    >
      Quay lại Trang Chủ
    </button>
  </div>
</template>
