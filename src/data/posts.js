import {markRaw} from "vue";
import dualGridPost from '@/views/posts/dual-grid-system-for-auto-tiling.vue'
import whatIsAnRPG from '@/views/posts/what-is-an-rpg.vue'
export const posts = [
    {
        id: 1,
        slug: 'dual-grid-system-for-auto-tiling',
        title: 'Dual Grid System for Auto Tiling',
        description: 'A review of my progress making a cozy game',
        date: 'January 2026',
        fullDate: 'January 2, 2026',
        emoji: '✨',
        category: 'devlog',
        readTime: '8 min read',
    },
    {
        id: 2,
        slug: 'what-is-an-rpg',
        title: 'What is an RPG?',
        description: 'Some thoughts on what I personally look for in an RPG',
        date: 'December 2025',
        fullDate: 'December 15, 2025',
        emoji: '✨',
        category: 'thoughts',
        readTime: '8 min read',
    }
]

// Helper to get post by slug
export function getPostBySlug(slug) {
    return posts.find(post => post.slug === slug) || null
}

// Helper to get posts by category
export function getPostsByCategory(category) {
    return posts.filter(post => post.category === category)
}
