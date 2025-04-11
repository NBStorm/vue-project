<template>
  <div
    class="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl mt-10 p-6 h-fit dark:bg-gray-900 dark:text-white"
  >
    <h1
      class="text-3xl font-bold mb-3 text-gray-800 text-center dark:text-white"
    >
      {{ blog.title }}
    </h1>
    <button class="back-button" @click="$router.go(-1)">← Back to Blogs</button>

    <article class="blog-post">
      <h1 class="blog-title">{{ blog.title }}</h1>

      <div class="blog-meta">
        <span class="author">By {{ blog.author }}</span>
        <span class="date">{{ formatDate(blog.createdAt) }}</span>
      </div>

      <div class="blog-image" v-if="blog.image">
        <img :src="blog.image" :alt="blog.title" />
      </div>

      <div class="blog-content" v-html="blog.content"></div>
    </article>

    <section class="comments-section">
      <h2>Comments ({{ comments.length }})</h2>

      <div class="comment-form">
        <textarea
          v-model="newComment"
          placeholder="Add your comment..."
        ></textarea>
        <button @click="addComment" :disabled="!newComment.trim()">
          Post Comment
        </button>
      </div>

      <div class="comments-list">
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

<style scoped>
.blog-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.back-button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 20px;
  padding: 5px 0;
}

.back-button:hover {
  text-decoration: underline;
}

.blog-post {
  margin-bottom: 40px;
}

.blog-title {
  font-size: 2rem;
  margin-bottom: 10px;
  color: #333;
}

.blog-meta {
  display: flex;
  gap: 15px;
  color: #666;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.blog-image img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

.blog-content {
  line-height: 1.6;
  font-size: 1.1rem;
  color: #333;
}

.comments-section {
  border-top: 1px solid #eee;
  padding-top: 30px;
}

.comments-section h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.comment-form {
  margin-bottom: 30px;
}

.comment-form textarea {
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  font-family: inherit;
}

.comment-form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.comment-form button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.comment {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}

.comment:last-child {
  border-bottom: none;
}

.comment-author {
  font-weight: bold;
  margin-bottom: 5px;
}

.comment-date {
  color: #666;
  font-size: 0.8rem;
  margin-bottom: 10px;
}

.comment-text {
  line-height: 1.5;
}
</style>
