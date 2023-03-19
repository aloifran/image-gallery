import { createRouter, createWebHistory } from "vue-router";
import { useAppStore } from "@/store/app";

// Layouts
import Auth from "@/layouts/Auth.vue";
import Default from "@/layouts/Default.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      meta: { layout: Default, requiresAuth: true },
      component: () =>
        import(/* webpackChunkName: "Home" */ "@/views/Home.vue"),
    },
    {
      path: "/sign-in",
      name: "Auth",
      meta: { layout: Auth },
      component: () =>
        import(/* webpackChunkName: "Auth" */ "@/views/Auth.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  const store = useAppStore();
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  const isLoggedIn = store.isLoggedIn;

  if (requiresAuth && isLoggedIn) {
    return true;
  }
  if (requiresAuth && !isLoggedIn) {
    return "/sign-in";
  }
});

export default router;
