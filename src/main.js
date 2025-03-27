import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import VueLazyload from "vue-lazyload";

const app = createApp(App)
    .use(VueLazyload, {
        preLoad: 1.3,
        error: '/error.png',
        loading: '/loading.gif',
        attempt: 1
    });
app.use(router);
app.mount("#app");
