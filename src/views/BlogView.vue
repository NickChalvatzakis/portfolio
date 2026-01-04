<script setup>
import { ref, computed } from 'vue'
import { posts } from '@/data/posts.js'
import BlogPostItem from '@/components/BlogPostItem.vue'
import CategoryTabs from '@/components/CategoryTabs.vue'
import TimelineItem from '@/components/TimelineItem.vue'
import SocialLinks from '@/components/SocialLinks.vue'

const profile = {
  name: 'Nick Chalvatzakis',
  description: 'Game developer passionate about creating immersive experiences. I write about game development, graphics programming, and other topics that interest me.',
  email: 'nickchinfo@gmail.com',
  resumeUrl: '/resume.pdf'
}

const socials = [
  { name: 'GitHub', icon: 'github', url: 'https://github.com/NickChalvatzakis' },
  { name: 'Tumblr', icon: 'tumblr', url: 'https://www.tumblr.com/blog/aggrevatedbeantriestomakegames' },
  { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/nickchinfo' },
]

const categories = [
  { id: 'devlog', label: 'dev log' },
  { id: 'thoughts', label: 'thoughts' }
]

const activeCategory = ref('devlog')

const filteredPosts = computed(() => {
  return posts.filter(post => post.category === activeCategory.value)
})

const timeline = [
  {
    emoji: '🏢',
    title: 'Game Developer @Mpass',
    subtitle: null,
    date: '2023 - present',
    isCurrent: true
  },
  {
    emoji: '🕹',
    title: 'Freelancer Game Developer',
    subtitle: null,
    date: '2014-2022'
  },
  {
    emoji: '🎓',
    title: 'Graduated Information and Communication Systems Engineering, University of Aegean',
    subtitle: null,
    date: '2014-2022'
  },
  {
    emoji: '🎮',
    title: 'Co-Founder @Unicorn Studios',
    subtitle: 'My first released public game!',
    date: '2012-2015'
  },
  {
    emoji: '🔑',
    title: 'Developer @Divinity Studios',
    subtitle: 'First steps as a hobbyist!',
    date: '2011-2012'
  },
]
</script>

<template>
  <div class="blog-view">
    <section class="profile-section">
      <div class="profile-image-container">
        <div class="profile-image">
          <img src="/profile.jpg" alt="Profile photo" @error="$event.target.style.display='none'">
          <div class="profile-placeholder">
            <span>📷</span>
          </div>
        </div>
      </div>

      <div class="profile-card">
        <p class="greeting">
          <span class="wave">👋</span>
          Hello! I am <strong>{{ profile.name }}</strong>, {{ profile.description }}
        </p>

        <div class="profile-footer">
          <div class="contact-links">
            <a :href="`mailto:${profile.email}`" class="contact-link">
              {{ profile.email }}
            </a>
            <span class="separator">/</span>
            <a :href="profile.resumeUrl" class="contact-link">
              resume
            </a>
          </div>

          <SocialLinks :socials="socials" />
        </div>
      </div>
    </section>

    <!-- Posts Section with Tabs -->
    <section class="posts-section">
      <h2 class="section-title">
        <span class="title-decoration">📝</span>
        My adventures in
      </h2>

      <CategoryTabs
          :categories="categories"
          :active-category="activeCategory"
          @update:active-category="activeCategory = $event"
      />

      <transition name="fade" mode="out-in">
        <div class="posts-list" :key="activeCategory">
          <BlogPostItem
              v-for="post in filteredPosts"
              :key="post.id"
              :post="post"
          />
          <p v-if="filteredPosts.length === 0" class="no-posts">
            No posts yet in this category.
          </p>
        </div>
      </transition>
    </section>

    <!-- Timeline Section -->
    <section class="timeline-section">
      <h2 class="section-title">
        <span class="title-decoration">📍</span>
        Journey
      </h2>

      <div class="timeline">
        <TimelineItem
            v-for="(item, index) in timeline"
            :key="index"
            :item="item"
            :is-first="index === 0"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.blog-view {
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

/* Profile Section */
.profile-section {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.profile-image-container {
  display: flex;
  justify-content: center;
}

.profile-image {
  width: 150px;
  height: 190px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--card-bg);
  border: 2px solid var(--border);
  box-shadow:
      4px 4px 0 var(--shadow-color),
      0 4px 12px rgba(0,0,0,0.08);
  position: relative;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  background: linear-gradient(135deg, var(--highlight) 0%, var(--card-bg) 100%);
}

.profile-image img:not([src=""]) + .profile-placeholder {
  display: none;
}

.profile-card {
  background: var(--card-bg);
  border: 2px solid var(--border);
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  box-shadow:
      4px 4px 0 var(--shadow-color),
      0 4px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.greeting {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--text);
  margin: 0;
}

.greeting strong {
  color: var(--accent-dark);
}

.wave {
  display: inline-block;
  animation: wave 2s ease-in-out infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  10%, 30% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  40% { transform: rotate(-4deg); }
  50%, 100% { transform: rotate(0deg); }
}

.profile-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--border);
  margin-top: 1rem;
}

.contact-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-link {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text);
  text-decoration: none;
  border-bottom: 1px dotted var(--text-muted);
  transition: all 0.2s ease;
}

.contact-link:hover {
  color: var(--accent-dark);
  border-bottom-color: var(--accent);
}

.separator {
  color: var(--text-muted);
  font-family: var(--font-mono);
}

/* Posts Section */
.posts-section {
  margin-bottom: 3rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.title-decoration {
  font-size: 1.3rem;
}

.posts-list {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.no-posts {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--text-muted);
  text-align: center;
  padding: 2rem;
  background: var(--card-bg);
  border: 2px dashed var(--border);
  border-radius: 8px;
}

/* Timeline Section */
.timeline-section {
  margin-top: 2rem;
}

.timeline {
  margin-top: 1rem;
  padding-left: 0.5rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 600px) {
  .profile-section {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .profile-image {
    width: 120px;
    height: 150px;
    margin: 0 auto;
  }

  .profile-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
