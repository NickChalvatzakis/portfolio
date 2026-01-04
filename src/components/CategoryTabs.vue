<script setup>
defineProps({
  categories: {
    type: Array,
    required: true
  },
  activeCategory: {
    type: String,
    required: true
  }
})

defineEmits(['update:activeCategory'])
</script>

<template>
  <div class="category-tabs">
    <button
      v-for="category in categories"
      :key="category.id"
      class="category-tab"
      :class="{ active: activeCategory === category.id }"
      @click="$emit('update:activeCategory', category.id)"
    >
      {{ category.label }}
    </button>
  </div>
</template>

<style scoped>
.category-tabs {
  display: flex;
  border: 2px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--card-bg);
}

.category-tab {
  flex: 1;
  padding: 0.75rem 1.25rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.category-tab:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 20%;
  height: 60%;
  width: 1px;
  background: var(--border);
}

.category-tab:hover:not(.active) {
  color: var(--text);
  background: var(--highlight);
}

.category-tab.active {
  color: var(--paper);
  background: var(--text);
}

@media (max-width: 480px) {
  .category-tab {
    padding: 0.6rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>
