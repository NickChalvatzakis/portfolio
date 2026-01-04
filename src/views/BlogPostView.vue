<script setup>
import { computed, shallowRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPostBySlug } from '@/data/posts.js'

const route = useRoute()
const router = useRouter()

const post = computed(() => {
  return getPostBySlug(route.params.slug)
})

const postModules = import.meta.glob('@/views/posts/*.vue')

const postContent = shallowRef(null)

watch(() => route.params.slug, async (slug) => {
  const path = `/src/views/posts/${slug}.vue`
  if (postModules[path]) {
    const module = await postModules[path]()
    postContent.value = module.default
  } else {
    postContent.value = null
  }
}, { immediate: true })

const goBack = () => {
  router.push('/blog')
}
</script>

<template>
  <article class="blog-post" v-if="post">
    <!-- Header -->
    <header class="post-header">
      <button class="back-button" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to blog
      </button>

      <div class="post-meta">
        <span class="post-category">{{ post.category }}</span>
        <span class="meta-separator">•</span>
        <span class="post-date">{{ post.fullDate }}</span>
        <span class="meta-separator">•</span>
        <span class="post-read-time">{{ post.readTime }}</span>
      </div>

      <h1 class="post-title">
        <span class="title-emoji">{{ post.emoji }}</span>
        {{ post.title }}
      </h1>
    </header>

    <!-- Content -->
    <div class="post-content">
      <component v-if="postContent" :is="postContent" />
    </div>

    <!-- Footer -->
    <footer class="post-footer">
      <div class="footer-divider"></div>
      <button class="back-button" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to all posts
      </button>
    </footer>
  </article>

  <!-- 404 State -->
  <div class="not-found" v-else>
    <span class="not-found-emoji">📭</span>
    <h1>Post not found</h1>
    <p>The post you're looking for doesn't exist.</p>
    <button class="back-button" @click="goBack">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      Back to blog
    </button>
  </div>
</template>

<style scoped>
.blog-post {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Back Button */
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.2s ease;
}

.back-button:hover {
  color: var(--text);
}

.back-button svg {
  width: 18px;
  height: 18px;
}

/* Header */
.post-header {
  margin-bottom: 2rem;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
}

.post-category {
  background: var(--highlight);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  text-transform: lowercase;
}

.meta-separator {
  opacity: 0.5;
}

.post-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1.2;
  margin: 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.title-emoji {
  font-size: 2rem;
  line-height: 1.3;
}

/* Content Styles */
.post-content {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text);
}

.post-content :deep(p) {
  margin: 0 0 1.5rem 0;
}

.post-content :deep(p.lead) {
  font-size: 1.2rem;
  color: var(--text-muted);
  border-left: 3px solid var(--accent);
  padding-left: 1rem;
  margin-bottom: 2rem;
}

.post-content :deep(h2) {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text);
  margin: 2.5rem 0 1rem 0;
}

.post-content :deep(h3) {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
  margin: 2rem 0 0.75rem 0;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin: 0 0 1.5rem 0;
  padding-left: 1.5rem;
}

.post-content :deep(li) {
  margin-bottom: 0.5rem;
}

.post-content :deep(strong) {
  font-weight: 600;
  color: var(--text);
}

.post-content :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--highlight);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  color: var(--accent-dark);
}

.post-content :deep(pre) {
  background: var(--card-bg);
  border: 2px solid var(--border);
  border-radius: 8px;
  padding: 1.25rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  box-shadow: 2px 2px 0 var(--shadow-color);
}

.post-content :deep(pre code) {
  background: none;
  padding: 0;
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--text);
}

.post-content :deep(blockquote) {
  margin: 2rem 0;
  padding: 1.25rem 1.5rem;
  background: var(--highlight);
  border-left: 4px solid var(--accent);
  border-radius: 0 8px 8px 0;
}

.post-content :deep(blockquote p) {
  margin: 0;
  font-style: italic;
  color: var(--text);
}

.post-content :deep(a) {
  color: var(--accent-dark);
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 2px;
  transition: color 0.2s ease;
}

.post-content :deep(a:hover) {
  color: var(--accent);
}

.post-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  border: 2px solid var(--border);
  margin: 1.5rem 0;
}

/* Footer */
.post-footer {
  margin-top: 3rem;
}

.footer-divider {
  height: 2px;
  background: repeating-linear-gradient(
      90deg,
      var(--border) 0,
      var(--border) 4px,
      transparent 4px,
      transparent 8px
  );
  margin-bottom: 1.5rem;
}

/* Not Found */
.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.not-found-emoji {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.not-found h1 {
  font-family: var(--font-display);
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
}

.not-found p {
  font-family: var(--font-mono);
  color: var(--text-muted);
  margin-bottom: 2rem;
}

@media (max-width: 600px) {
  .post-title {
    font-size: 1.75rem;
  }

  .title-emoji {
    font-size: 1.5rem;
  }

  .post-content {
    font-size: 1rem;
  }

  .post-content :deep(h2) {
    font-size: 1.4rem;
  }

  .post-meta {
    flex-wrap: wrap;
  }
}
</style>
