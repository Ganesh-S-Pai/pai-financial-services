import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import("@/pages/HomePage.vue"),
      meta: { login: true}
    },
    {
      name: 'login',
      path: '/login',
      component: () => import("@/pages/HomePage.vue"),
    },
    {
      name: 'register',
      path: '/register',
      component: () => import("@/pages/HomePage.vue"),
    }
  ],
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
