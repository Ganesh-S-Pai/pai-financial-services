import { isAuthenticated } from '@/services/authService';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue'),
    meta: { login: true },
    redirect: '/vhiw',
    children: [
      {
        path: '/vhiw',
        name: 'VHIW Mysore',
        component: () => import('@/pages/VhiwPage.vue'),
        meta: { login: true },
      }
    ]
  },
  { path: '/login', name: 'Login', component: () => import('@/pages/LoginPage.vue') },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/RegisterPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: () => import('@/pages/NotFoundPage.vue'),
  }],
})

router.beforeEach((to, _from, next) => {
  if (to.meta.login) {
    const isUserAuthenticated = !!isAuthenticated();
    if (!isUserAuthenticated) {
      return next({ name: 'Login', query: { redirect: to.fullPath } });
    }
  }
  next()
})

export default router
