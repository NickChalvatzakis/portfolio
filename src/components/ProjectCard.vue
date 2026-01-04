<script setup>
import { ref } from 'vue'

defineProps({
  project: {
    type: Object,
    required: true
  }
})

const imageError = ref(false)
</script>

<template>
  <a :href="project.url" class="project-card">
    <div class="card-image">
      <img 
        v-if="!imageError"
        :src="project.image" 
        :alt="project.title"
        @error="imageError = true"
      >
      <div v-if="imageError" class="image-placeholder">
        <span>🎮</span>
      </div>
      <div class="card-overlay">
        <svg class="view-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
          <path d="M11 8v6M8 11h6"/>
        </svg>
      </div>
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ project.title }}</h3>
      <p class="card-description">{{ project.description }}</p>
    </div>
  </a>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  background: var(--card-bg);
  border: 2px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  color: var(--text);
  transition: all 0.3s ease;
  box-shadow: 
    4px 4px 0 var(--shadow-color),
    0 4px 12px rgba(0,0,0,0.06);
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 
    6px 6px 0 var(--accent-light),
    0 8px 20px rgba(0,0,0,0.1);
}

.card-image {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--highlight);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.project-card:hover .card-image img {
  transform: scale(1.05);
}

.image-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  background: linear-gradient(135deg, var(--highlight) 0%, var(--paper) 100%);
}

.card-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .card-overlay {
  opacity: 1;
}

.view-icon {
  width: 48px;
  height: 48px;
  color: white;
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.project-card:hover .view-icon {
  transform: scale(1);
}

.card-content {
  padding: 1rem 1.25rem 1.25rem;
}

.card-title {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.4rem 0;
  color: var(--text);
  border-bottom: 1px dotted var(--border);
  padding-bottom: 0.4rem;
}

.card-description {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.5;
}
</style>
