<template>
  <div
    class="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl mt-10 p-6 h-fit dark:bg-gray-900 dark:text-white"
  >
    <h1
      class="text-3xl font-bold mb-3 text-gray-800 text-center dark:text-white"
    >
      My Blogs
    </h1>

    <main class="blog-container">
      <!-- Danh sách blog -->
      <div class="blog-list">
        <BlogComponent
          v-for="blog in paginatedBlogs"
          :key="blog.id"
          :blog="blog"
          @click="goToBlogDetail(blog.id)"
        />
      </div>

      <!-- Pagination -->
      <div class="pagination-container">
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-changed="changePage"
        />
      </div>
    </main>
  </div>
</template>

<script>
import BlogComponent from "@/components/BlogComponent.vue";
import Pagination from "@/components/Pagination.vue";
import { fetchBlogs } from "@/api/blogApi";

export default {
  name: "BlogApp",
  components: {
    BlogComponent,
    Pagination,
  },
  data() {
    return {
      blogs: [],
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.blogs.length / this.itemsPerPage);
    },
    paginatedBlogs() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.blogs.slice(start, end);
    },
  },
  async created() {
    try {
      this.blogs = await fetchBlogs();
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    goToBlogDetail(blogId) {
      this.$router.push(`/blog/${blogId}`);
    },
  },
};
</script>

<style scoped>
.blog-app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.blog-header {
  text-align: center;
  margin-bottom: 40px;
}

.blog-header h1 {
  font-size: 2.5rem;
  color: #333;
}

.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>
