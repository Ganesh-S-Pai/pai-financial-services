import { useAuthentication } from '@/services/authService';
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
        path: '/profile',
        name: 'Profile',
        component: () => import('@/pages/ProfilePage.vue'),
        meta: { login: true },
      },
      {
        path: '/vhiw',
        name: 'VHIW Mysore',
        component: () => import('@/pages/VhiwPage.vue'),
        meta: { login: true },
      },
      {
        path: '/malt',
        name: 'Malt House',
        component: () => import('@/pages/MaltPage.vue'),
        meta: { login: true },
      },
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
  const { isAuthenticated } = useAuthentication();

  if (to.meta.login) {
    const isUserAuthenticated = !!isAuthenticated.value;
    if (!isUserAuthenticated) {
      return next({ name: 'Login', query: { redirect: to.fullPath } });
    }
  }
  next()
})

export default router
