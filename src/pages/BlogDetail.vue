<template>
  <div
    class="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl mt-10 p-6 h-fit dark:bg-gray-900 dark:text-white"
  >
    <h1
      class="text-3xl font-bold mb-3 text-gray-800 text-center dark:text-white"
    >
      {{ blog.title }}
    </h1>
    <button
      class="text-blue-500 hover:underline text-lg mb-5"
      @click="$router.go(-1)"
    >
      ← Back to Blogs
    </button>

    <article class="mb-10">
      <h2 class="text-2xl mb-2 text-gray-800">{{ blog.title }}</h2>

      <div class="flex gap-4 text-gray-600 text-sm mb-5">
        <span>By {{ blog.author }}</span>
        <span>{{ formatDate(blog.createdAt) }}</span>
      </div>

      <div v-if="blog.image" class="mb-5">
        <img
          :src="blog.image"
          :alt="blog.title"
          class="w-full max-h-96 object-cover rounded-lg"
        />
      </div>

      <div class="prose dark:prose-invert" v-html="blog.content"></div>
    </article>

    <section class="border-t border-gray-200 pt-8">
      <h2 class="text-xl font-semibold mb-5">
        Comments ({{ comments.length }})
      </h2>

      <div class="mb-8">
        <textarea
          v-model="newComment"
          placeholder="Add your comment..."
          class="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          @click="addComment"
          :disabled="!newComment.trim()"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Post Comment
        </button>
      </div>

      <div>
        <CommentComponent
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { fetchBlogById, fetchComments, postComment } from "../api/blogApi";
import CommentComponent from "@/components/CommentComponent.vue";

export default {
  name: "BlogDetail",
  components: {
    CommentComponent,
  },
  data() {
    return {
      blog: {},
      comments: [],
      newComment: "",
      isLoading: false,
      error: null,
      successMessage: null,
    };
  },
  async created() {
    await this.loadBlogData();
  },
  methods: {
    async loadBlogData() {
      this.isLoading = true;
      this.error = null;
      try {
        const blogId = this.$route.params.id;
        const [blogData, commentsData] = await Promise.all([
          fetchBlogById(blogId),
          fetchComments(blogId),
        ]);

        this.blog = this.formatBlogData(blogData);
        this.comments = this.formatCommentsData(commentsData);
      } catch (error) {
        console.error("Error loading blog details:", error);
        this.error = "Failed to load blog data. Please try again later.";
      } finally {
        this.isLoading = false;
      }
    },

    formatBlogData(blog) {
      return {
        ...blog,
        formattedDate: this.formatDate(blog.createdAt),
        readingTime: this.calculateReadingTime(blog.content),
      };
    },

    formatCommentsData(comments) {
      return comments.map((comment) => ({
        ...comment,
        formattedDate: this.formatDate(comment.createdAt),
      }));
    },

    formatDate(dateString) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },

    calculateReadingTime(content) {
      const wordsPerMinute = 200;
      const wordCount = content.split(/\s+/).length;
      return Math.ceil(wordCount / wordsPerMinute);
    },

    async addComment() {
      if (!this.newComment.trim()) return;

      this.isLoading = true;
      this.error = null;
      this.successMessage = null;

      try {
        const comment = {
          blogId: this.blog.id,
          author: this.getCurrentUser(), // Lấy user từ store hoặc auth
          text: this.newComment,
          createdAt: new Date().toISOString(),
          avatar: this.getUserAvatar(), // Thêm avatar nếu có
        };

        const savedComment = await postComment(comment);
        this.comments.unshift(this.formatCommentData(savedComment));
        this.successMessage = "Comment posted successfully!";
        this.newComment = "";

        // Tự động reset message sau 3s
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      } catch (error) {
        console.error("Error posting comment:", error);
        this.error = "Failed to post comment. Please try again.";
      } finally {
        this.isLoading = false;
      }
    },

    getCurrentUser() {
      // Thay bằng logic lấy user thực tế từ Vuex store hoặc auth
      return "Current User";
    },

    getUserAvatar() {
      // Thay bằng logic lấy avatar user
      return `https://i.pravatar.cc/50?u=${this.blog.id}`;
    },

    formatCommentData(comment) {
      return {
        ...comment,
        formattedDate: this.formatDate(comment.createdAt),
      };
    },
  },
};
</script>

<style scoped></style>
