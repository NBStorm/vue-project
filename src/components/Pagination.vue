<template>
  <div class="flex gap-1">
    <button
      class="px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      :disabled="currentPage === 1"
      @click="$emit('page-changed', currentPage - 1)"
    >
      &laquo; Previous
    </button>

    <button
      v-for="page in pages"
      :key="page"
      class="px-4 py-2 border border-gray-300 text-gray-800 rounded-md transition-all hover:bg-gray-100"
      :class="{
        'bg-blue-500 text-white': page === currentPage, // Nút hiện tại có nền xanh
        'bg-white hover:bg-gray-100': page !== currentPage, // Nút khác có nền trắng
      }"
      @click="$emit('page-changed', page)"
    >
      {{ page }}
    </button>

    <button
      class="px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      :disabled="currentPage === totalPages"
      @click="$emit('page-changed', currentPage + 1)"
    >
      Next &raquo;
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    maxVisibleButtons: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    pages() {
      const range = [];
      const half = Math.floor(this.maxVisibleButtons / 2);
      let start = Math.max(this.currentPage - half, 1);
      let end = Math.min(start + this.maxVisibleButtons - 1, this.totalPages);

      if (end - start + 1 < this.maxVisibleButtons) {
        start = Math.max(end - this.maxVisibleButtons + 1, 1);
      }

      for (let i = start; i <= end; i++) {
        range.push(i);
      }

      return range;
    },
  },
};
</script>
