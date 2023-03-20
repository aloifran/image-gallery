import { createPinia } from "pinia";
import router from "@/router/router";
import { markRaw } from "vue";

const pinia = createPinia();

// Router can be used from pinia store
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

export default pinia;
