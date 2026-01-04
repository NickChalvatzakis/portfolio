<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

// Support both external URLs and internal slugs
const isExternal = computed(() => {
  return props.post.url && (props.post.url.startsWith('http') || props.post.url.startsWith('#'))
})

const linkTo = computed(() => {
  if (isExternal.value) return null
  return { name: 'blog-post', params: { slug: props.post.slug } }
})
</script>

<template>
  <!-- External link -->
  <a
      v-if="isExternal"
      :href="post.url"
      class="post-item"
      target="_blank"
      rel="noopener noreferrer"
  >
    <div class="post-content">
      <div class="post-header">
        <span class="post-emoji">{{ post.emoji }}</span>
        <h3 class="post-title">{{ post.title }}</h3>
      </div>
      <p class="post-description">{{ post.description }}</p>
    </div>
    <div class="post-meta">
      <span class="post-date">{{ post.date }}</span>
      <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </div>
  </a>

  <!-- Internal router link -->
  <router-link
      v-else
      :to="linkTo"
      class="post-item"
  >
    <div class="post-content">
      <div class="post-header">
        <span class="post-emoji">{{ post.emoji }}</span>
        <h3 class="post-title">{{ post.title }}</h3>
      </div>
      <p class="post-description">{{ post.description }}</p>
    </div>
    <div class="post-meta">
      <span class="post-date">{{ post.date }}</span>
      <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </div>
  </router-link>
</template>

<style scoped>
.post-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: var(--card-bg);
  border: 2px solid var(--border);
  border-radius: 8px;
  text-decoration: none;
  color: var(--text);
  transition: all 0.2s ease;
  box-shadow:
      2px 2px 0 var(--shadow-color),
      0 2px 8px rgba(0,0,0,0.04);
}

.post-item:hover {
  transform: translateX(4px);
  border-color: var(--accent);
  box-shadow:
      4px 4px 0 var(--accent-light),
      0 4px 12px rgba(0,0,0,0.08);
}

.post-content {
  flex: 1;
  min-width: 0;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.35rem;
}

.post-emoji {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.post-title {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-description {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: 1rem;
  flex-shrink: 0;
}

.post-date {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  background: var(--highlight);
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
}

.arrow {
  width: 18px;
  height: 18px;
  color: var(--text-muted);
  transition: all 0.2s ease;
}

.post-item:hover .arrow {
  color: var(--accent);
  transform: translateX(4px);
}

@media (max-width: 600px) {
  .post-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .post-meta {
    margin-left: 0;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
