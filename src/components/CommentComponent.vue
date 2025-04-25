<template>
  <div class="comment mb-4 p-4 border border-gray-300 rounded-lg">
    <div class="comment-header flex items-center mb-2 text-left">
      <div class="comment-info flex flex-col text-left">
        <span class="comment-author font-bold text-gray-800">{{
          comment.author
        }}</span>
        <span class="comment-date text-sm text-gray-500">{{
          formatDate(comment.createdAt)
        }}</span>
      </div>
    </div>
    <div class="comment-text text-gray-700 text-left">{{ comment.text }}</div>
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
