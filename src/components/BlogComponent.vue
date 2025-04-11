<template>
    <article class="blog-card" @click="$emit('click')">
      <div class="blog-image" v-if="blog.image">
        <img :src="blog.image" :alt="blog.title">
      </div>
      <div class="blog-content">
        <h2 class="blog-title">{{ blog.title }}</h2>
        <p class="blog-excerpt">{{ blog.excerpt }}</p>
        <div class="blog-meta">
          <span class="blog-author">{{ blog.author }}</span>
          <span class="blog-date">{{ formatDate(blog.createdAt) }}</span>
        </div>
      </div>
    </article>
  </template>
  
  <script>
  export default {
    name: 'BlogComponent',
    props: {
      blog: {
        type: Object,
        required: true
      }
    },
    methods: {
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
      }
    }
  }
  </script>
  
  <style scoped>
  .blog-card {
    border: 1px solid #eaeaea;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    background: white;
  }
  
  .blog-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .blog-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .blog-content {
    padding: 20px;
  }
  
  .blog-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  .blog-excerpt {
    color: #666;
    margin-bottom: 15px;
    line-height: 1.5;
  }
  
  .blog-meta {
    display: flex;
    justify-content: space-between;
    color: #888;
    font-size: 0.9rem;
  }
  </style>