<script setup>
defineProps({
  socials: {
    type: Array,
    required: true
  }
})

const icons = {
  twitter: `<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>`,
  github: `<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>`,
  linkedin: `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>`,
  youtube: `<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>`,
  twitch: `<path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"/>`,
  discord: `<path d="M18.8 5.8a14.6 14.6 0 0 0-3.6-1.1 10.9 10.9 0 0 0-.5 1 13.5 13.5 0 0 0-4.1 0 10.9 10.9 0 0 0-.5-1 14.6 14.6 0 0 0-3.6 1.1A15.3 15.3 0 0 0 3.9 17a14.8 14.8 0 0 0 4.5 2.3 11.2 11.2 0 0 0 1-1.6 9.6 9.6 0 0 1-1.5-.7l.4-.3a10.5 10.5 0 0 0 9 0l.4.3a9.6 9.6 0 0 1-1.5.7 11.2 11.2 0 0 0 1 1.6 14.8 14.8 0 0 0 4.5-2.3 15.3 15.3 0 0 0-2.6-11.2zM9.5 14.5c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm5 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/>`,
  instagram: `<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>`,
  email: `<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>`,
  website: `<circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`
}
</script>

<template>
  <div class="social-links">
    <a 
      v-for="social in socials" 
      :key="social.name"
      :href="social.url"
      :title="social.name"
      class="social-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg 
        class="social-icon" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        v-html="icons[social.icon] || icons.website"
      />
    </a>
  </div>
</template>

<style scoped>
.social-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  color: var(--text-muted);
  transition: all 0.2s ease;
}

.social-link:hover {
  color: var(--text);
  border-color: var(--text);
  transform: translateY(-2px);
}

.social-icon {
  width: 18px;
  height: 18px;
}
</style>
