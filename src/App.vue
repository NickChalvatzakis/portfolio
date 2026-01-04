<script setup>
import NavHeader from '@/components/NavHeader.vue'
</script>

<template>
  <div class="app">
    <div class="notebook">
      <div class="notebook-content">
        <NavHeader />
        <main class="main-content">
          <router-view v-slot="{ Component }">
            <transition name="page" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.notebook {
  width: 100%;
  max-width: 900px;
  background: var(--paper);
  border-radius: 12px;
  box-shadow: 
    0 2px 4px rgba(0,0,0,0.04),
    0 8px 16px rgba(0,0,0,0.06),
    0 20px 40px rgba(0,0,0,0.04);
  position: relative;
  overflow: hidden;
}

.notebook::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    repeating-linear-gradient(
      transparent,
      transparent 31px,
      var(--line) 31px,
      var(--line) 32px
    );
  background-position: 0 80px;
  pointer-events: none;
  opacity: 0.4;
}

.notebook-content {
  padding: 2rem 2.5rem;
  position: relative;
  z-index: 1;
}

.main-content {
  margin-top: 2rem;
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .app {
    padding: 0;
  }
  
  .notebook {
    border-radius: 0;
  }
  
  .notebook-content {
    padding: 1.5rem;
  }
}
</style>
