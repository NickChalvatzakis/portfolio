<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isActive = (path) => computed(() => route.path === path)
</script>

<template>
  <header class="nav-header">
    <nav class="nav">
      <router-link 
        to="/blog" 
        class="nav-link"
        :class="{ active: isActive('/blog').value }"
      >
        <span class="slash">/</span>blog
      </router-link>
      <router-link 
        to="/projects" 
        class="nav-link"
        :class="{ active: isActive('/projects').value }"
      >
        <span class="slash">/</span>projects
      </router-link>
    </nav>
  </header>
</template>

<style scoped>
.nav-header {
  display: flex;
  justify-content: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px dashed var(--border);
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-muted);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link .slash {
  color: var(--accent);
  margin-right: 2px;
}

.nav-link:hover {
  color: var(--text);
  background: var(--highlight);
}

.nav-link.active {
  color: var(--text);
  background: var(--highlight);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: var(--accent);
  border-radius: 50%;
}

@media (max-width: 480px) {
  .nav {
    gap: 1rem;
  }
  
  .nav-link {
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>
