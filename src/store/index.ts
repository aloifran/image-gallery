import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "@/router/router";
import { markRaw } from "vue";

const pinia = createPinia();

pinia
  // State can be persisted
  .use(piniaPluginPersistedstate)
  // Router can be used from pinia store
  .use(({ store }) => {
    store.router = markRaw(router);
  });

export default pinia;
