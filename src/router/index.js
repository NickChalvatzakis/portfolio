import { createRouter, createWebHistory } from 'vue-router'
import BlogView from '@/views/BlogView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import BlogPostView from "@/views/BlogPostView.vue";

const routes = [
  {
    path: '/',
    redirect: '/blog'
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogView
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: BlogPostView
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
