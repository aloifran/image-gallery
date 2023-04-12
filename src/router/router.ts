import { createRouter, createWebHistory } from "vue-router";
import { useAppStore } from "@/store/app";

// Layouts
import Auth from "@/layouts/Auth.vue";
import Default from "@/layouts/Default.vue";
import NotFound from "@/layouts/NotFound.vue";

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
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      meta: { layout: NotFound },
      component: () =>
        import(/* webpackChunkName: "NotFound" */ "@/views/NotFound.vue"),
    },
  ],
});

const USER_PROFILE_RETRY_INTERVAL_MS = 1000;
const USER_PROFILE_MAX_RETRIES = 3;

router.beforeEach(async (to) => {
  const store = useAppStore();

  // Rules
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  const isLoggedIn = store.isLoggedIn;
  const isLoginPage = to.name === "sign-in";

  // Guards
  // Wait for provider login
  let attempt: number = 0;

  const userProfile = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  if (requiresAuth) {
    while (!store.isLoggedIn) {
      await userProfile(USER_PROFILE_RETRY_INTERVAL_MS);
      attempt++;
      console.log(`User profile loading... attempt: ${attempt}`);

      // if no credentials found, redirect to login page
      if (attempt === USER_PROFILE_MAX_RETRIES) {
        return "sign-in";
      }
    }
  }

  // Skip login page if user is already loggedin
  if (isLoggedIn && isLoginPage) {
    return "/";
  }
});

export default router;
