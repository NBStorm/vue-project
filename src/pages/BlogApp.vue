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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <BlogComponent
          v-for="blog in paginatedBlogs"
          :key="blog.id"
          :blog="blog"
          @click="goToBlogDetail(blog.id)"
        />
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-10">
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
import { ref, computed, onMounted } from "vue";
import BlogComponent from "@/components/BlogComponent.vue";
import Pagination from "@/components/Pagination.vue";
import { fetchBlogs } from "@/api/blogApi";
import { useRouter } from "vue-router";
export default {
  name: "BlogApp",
  components: {
    BlogComponent,
    Pagination,
  },
  setup() {
    const blogs = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 6;
    const router = useRouter();
    const totalPages = computed(() => {
      return Math.ceil(blogs.value.length / itemsPerPage);
    });

    const paginatedBlogs = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return blogs.value.slice(start, end);
    });

    const changePage = (page) => {
      currentPage.value = page;
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const goToBlogDetail = (blogId) => {
      router.push(`/blog/${blogId}`); // Use router.push to navigate
    };

    onMounted(async () => {
      try {
        blogs.value = await fetchBlogs();
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    });

    return {
      blogs,
      currentPage,
      totalPages,
      paginatedBlogs,
      changePage,
      goToBlogDetail,
    };
  },
};
</script>
