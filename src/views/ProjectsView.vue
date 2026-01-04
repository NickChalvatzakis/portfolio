<script setup>
import ProjectCard from '@/components/ProjectCard.vue'

// Sample data - replace with your actual projects
const projects = [
  {
    id: 1,
    title: 'The Midnight Game',
    description: 'First Game I have ever released in public',
    image: '@/assets/projects/MMCover.jpg',
    url: 'https://www.indiedb.com/games/the-midnight-game'
  },
  {
    id: 2,
    title: 'Horizon',
    description: 'First Mobile Game, although it is now unavailable',
    image: '@/assets/projects/horizon.png',
    url: '#'
  },
  {
    id: 3,
    title: 'Match 3',
    description: 'Project for MPASS, made for Web to work on Mobile and Desktop',
    image: '@/assets/projects/find.png',
    url: '#'
  },
  {
    id: 4,
    title: 'Racing Game',
    description: 'Project for MPASS, made for Web to work on Mobile and Desktop',
    image: '@/assets/projects/find.png',
    url: '#'
  },
  {
    id: 5,
    title: 'Find The Card',
    description: 'Project for MPASS, made for Web to work on Mobile and Desktop',
    image: '@/assets/projects/find.png',
    url: '#'
  },
  {
    id: 6,
    title: 'Moles',
    description: 'Project for MPASS, made for Web to work on Mobile and Desktop',
    image: '@/assets/projects/find.png',
    url: '#'
  }
]
</script>

<template>
  <div class="projects-view">
    <header class="page-header">
      <h1 class="page-title">Things I worked on</h1>
      <p class="page-description">
        An overview of some of the projects I have worked on. Some smaller, some bigger.
        Click the cards to see more details.
      </p>
    </header>

    <div class="projects-grid">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>
  </div>
</template>

<style scoped>
.projects-view {
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

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 0.75rem 0;
}

.page-description {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 600px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
