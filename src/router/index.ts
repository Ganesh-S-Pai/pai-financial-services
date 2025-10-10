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
        path: '/admin',
        name: 'Admin',
        component: () => import('@/pages/AdminPage.vue'),
        meta: { login: true },
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/pages/ProfilePage.vue'),
        meta: { login: true },
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/pages/AboutPage.vue'),
        meta: { login: true },
      },
      {
        path: '/vhiw',
        name: 'Van Heusen',
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
    const isUserAuthenticated = !!isAuthenticated();
    if (!isUserAuthenticated) {
      return next({ name: 'Login', query: { redirect: to.fullPath } });
    }
  }
  next()
})

router.onError(() => {
  router.push("/")
})

export default router
