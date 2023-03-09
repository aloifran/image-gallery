// Composables
import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/layouts/Auth.vue";

// TODO: implement guards to redirect if user not logged in

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue"),
  },
  {
    path: "/sign-in",
    name: "SignIn",
    // props of the route
    meta: { layout: AuthLayout },
    component: () =>
      import(/* webpackChunkName: "SignIn" */ "@/views/SignIn.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
