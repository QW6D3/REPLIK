import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ContactView from '../views/ContactView.vue';
import PodcastView from '../views/PodcastsView.vue';
import Podcast from '../components/AudioPlayer.vue';
// @ts-ignore
import LoginView from '../views/Admin/LoginView.vue';
// @ts-ignore
import AdminView from '../views/Admin/AdminView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/surf',
      name: 'test',
      component: Podcast
    },
    {
      path: '/podcasts/:idPodcast',
      name: 'podcast',
      component: PodcastView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true } 
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next('/login'); 
  } else {
    next(); 
  }
});

export default router
