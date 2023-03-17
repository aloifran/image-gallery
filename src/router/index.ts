// Composables
import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/layouts/Auth.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () =>
        import(/* webpackChunkName: "Home" */ "@/views/Home.vue"),
    },
    {
      path: "/sign-in",
      name: "Auth",
      meta: { layout: AuthLayout },
      component: () =>
        import(/* webpackChunkName: "SignIn" */ "@/views/Auth.vue"),
    },
  ],
});

export default router;
