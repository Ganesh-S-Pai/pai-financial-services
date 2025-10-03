import { createRouter, createWebHistory } from 'vue-router'

export const routes = {
  home: { path: '/', name: 'Home', component: () => import('@/pages/HomePage.vue'), meta: { login: true } },
  vhiw: { path: '/vhiw', name: 'VHIW Mysore', component: () => import('@/pages/VhiwPage.vue'), meta: { login: true } },
  login: { path: '/login', name: 'Login', component: () => import('@/pages/LoginPage.vue') },
  register: { path: '/register', name: 'Register', component: () => import('@/pages/RegisterPage.vue') },
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: Object.values(routes),
})

router.beforeEach((_to, _from, next) => {
  // if (to.meta.login) {
  //   // Replace this with your actual authentication check
  //   const isAuthenticated = !!localStorage.getItem('authToken');
  //   if (!isAuthenticated) {
  //     return next({ name: 'login', query: { redirect: to.fullPath } });
  //   }
  // }
  next();
});

export default router
