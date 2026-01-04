<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  isFirst: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="timeline-item" :class="{ 'is-first': isFirst }">
    <div class="timeline-marker">
      <div class="marker-dot" :class="{ 'hollow': isFirst }"></div>
      <div class="marker-line"></div>
    </div>
    <div class="timeline-content">
      <div class="timeline-header">
        <span class="timeline-emoji">{{ item.emoji }}</span>
        <h4 class="timeline-title">{{ item.title }}</h4>
      </div>
      <p v-if="item.subtitle" class="timeline-subtitle">{{ item.subtitle }}</p>
      <span class="timeline-date">{{ item.date }}</span>
    </div>
  </div>
</template>

<style scoped>
.timeline-item {
  display: flex;
  gap: 1rem;
  position: relative;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 20px;
}

.marker-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--text);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.marker-dot.hollow {
  background: var(--paper);
  border: 2px solid var(--text);
}

.marker-line {
  width: 2px;
  flex: 1;
  background: var(--text);
  margin-top: 4px;
  border-style: dotted;
  border-width: 0 0 0 2px;
  border-color: var(--text);
  width: 0;
}

.timeline-item:last-child .marker-line {
  display: none;
}

.is-first .marker-line {
  border-style: dotted;
}

.timeline-content {
  padding-bottom: 1.5rem;
  flex: 1;
}

.timeline-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.timeline-emoji {
  font-size: 1rem;
}

.timeline-title {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text);
  margin: 0;
}

.timeline-subtitle {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0 0 0.25rem 0;
}

.timeline-date {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}

@media (max-width: 480px) {
  .timeline-content {
    padding-bottom: 1.25rem;
  }
  
  .timeline-title {
    font-size: 0.85rem;
  }
}
</style>
