<template>
  <article
    class="border border-gray-300 rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg cursor-pointer bg-white"
    @click="$emit('click')"
  >
    <div class="w-full h-52 overflow-hidden" v-if="blog.image">
      <img
        :src="blog.image"
        :alt="blog.title"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="p-5">
      <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ blog.title }}</h2>
      <p class="text-gray-600 mb-4 leading-relaxed">{{ blog.excerpt }}</p>
      <div class="flex justify-between text-gray-500 text-sm">
        <span>{{ blog.author }}</span>
        <span>{{ formatDate(blog.createdAt) }}</span>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "BlogComponent",
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped></style>
