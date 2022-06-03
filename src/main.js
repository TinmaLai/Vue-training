import { createApp } from "vue";
import App from "./App.vue";
import VueCookies from 'vue-cookies';
import store from './store/store';
import axios from 'axios';
import { registerLicense } from "@syncfusion/ej2-base";
import Paginate from "vuejs-paginate-next";
import router from './router/routes';

// Registering Syncfusion license key
registerLicense(
    "ORg4AjUWIQA/Gnt2VVhhQlFaclhJW3xLYVF2R2FJfl56dlNMYl9BJAtUQF1hS35WdkZhW31WcHNcRmNe"
);
axios.defaults.withCredentials = true;

// Xử lý lỗi Authen khi F5
axios.interceptors.response.use(undefined, function(error) {
    if (error) {
      const originalRequest = error.config;
      if (error.response.status === 404 && !originalRequest._retry) {
        originalRequest._retry = true;
        store.dispatch("logout");
        return router.push("/");
      }
    }
  });

const app = createApp(App);
app.component("MISAPagination", Paginate);
app.use(require("vue3-shortkey"));
app.use(router);
app.use(store);
app.use(VueCookies);

app.mount("#app");
