import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import { createPinia } from "pinia";
import piniaPersistedState from "pinia-plugin-persistedstate";

const app = createApp(App);
app.use(router);
app.use(createPinia());
const pinia = createPinia();
pinia.use(piniaPersistedState);
app.mount("#app");
