<template>
  <div class="comment">
    <div class="comment-header">
      <div class="comment-info">
        <span class="comment-author">{{ comment.author }}</span>
        <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
      </div>
    </div>
    <div class="comment-text">{{ comment.text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return date.toLocaleDateString("en-US", options);
    },
  },
};
</script>

<style scoped>
.comment {
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  text-align: left;
}

.comment-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.comment-author {
  font-weight: bold;
  color: #333;
}

.comment-date {
  font-size: 0.8rem;
  color: #666;
}

.comment-text {
  color: #444;
  text-align: left;
}
</style>
