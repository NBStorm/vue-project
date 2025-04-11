<template>
    <div class="pagination">
      <button 
        class="pagination-button"
        :disabled="currentPage === 1"
        @click="$emit('page-changed', currentPage - 1)"
      >
        &laquo; Previous
      </button>
      
      <button 
        v-for="page in pages" 
        :key="page"
        class="pagination-button"
        :class="{ active: page === currentPage }"
        @click="$emit('page-changed', page)"
      >
        {{ page }}
      </button>
      
      <button 
        class="pagination-button"
        :disabled="currentPage === totalPages"
        @click="$emit('page-changed', currentPage + 1)"
      >
        Next &raquo;
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Pagination',
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      },
      maxVisibleButtons: {
        type: Number,
        default: 5
      }
    },
    computed: {
      pages() {
        const range = []
        const half = Math.floor(this.maxVisibleButtons / 2)
        let start = Math.max(this.currentPage - half, 1)
        let end = Math.min(start + this.maxVisibleButtons - 1, this.totalPages)
        
        if (end - start + 1 < this.maxVisibleButtons) {
          start = Math.max(end - this.maxVisibleButtons + 1, 1)
        }
        
        for (let i = start; i <= end; i++) {
          range.push(i)
        }
        
        return range
      }
    }
  }
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    gap: 5px;
  }
  
  .pagination-button {
    padding: 8px 16px;
    border: 1px solid #ddd;
    background-color: white;
    color: #333;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s;
  }
  
  .pagination-button:hover:not(:disabled) {
    background-color: #f0f0f0;
  }
  
  .pagination-button.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }
  
  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  </style>