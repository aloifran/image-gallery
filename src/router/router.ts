import { createRouter, createWebHistory } from "vue-router";
import { useAppStore } from "@/store/app";
import nProgress, { NProgress } from "nprogress";

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

router.beforeEach(async (to) => {
  const store = useAppStore();

  // Rules & Guards
  const isLoggedIn = await store.isUserReady;
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
  const isLoginPage = to.name === "sign-in";

  // show progress bar
  nProgress.start();

  // Check if the URL contains an access token
  const tokenIndex = to.fullPath.indexOf("#access_token=");
  if (tokenIndex !== -1) {
    // Remove the access token from the URL
    const updatedPath = to.fullPath.substring(0, tokenIndex);
    return updatedPath;
  }

  // If private route and user not logged in
  if (requiresAuth && !isLoggedIn) {
    return "sign-in";
  }

  // Skip login page if user is already loggedin
  if (isLoggedIn && isLoginPage) {
    return "/";
  }
});

router.afterEach(() => {
  nProgress.done();
});

export default router;
