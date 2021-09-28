import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import Home from '@/components/Home/Home.vue'
import NewPost from '@/components/NewPost/NewPost.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/posts/new',
      component: NewPost
    }
  ],
})

export {
  router
}

export default {
  router
}
