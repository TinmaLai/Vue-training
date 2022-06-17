import { createApp } from "vue";
import App from "./App.vue";
import VueCookies from 'vue-cookies';
import store from './store/store';
import axios from 'axios';
import { registerLicense } from "@syncfusion/ej2-base";
import Paginate from "vuejs-paginate-next";
import router from './router/routes';
import MISACheckbox from './components/base/MISACheckbox.vue';
import MISACombobox from './components/base/MISACombobox.vue'
import MISAInput from './components/base/MISAInput.vue';
import MISADatepicker from './components/base/MISADatepicker.vue';
import ValidateAlert from './views/ValidateAlertDialog.vue';
import MISAInputLicense from './components/base/MISAInputLicense.vue';

// Registering Syncfusion license key
registerLicense(
    "ORg4AjUWIQA/Gnt2VVhhQlFac1pJWnxAYVF2R2FJfFRxdV9GZUwgOX1dQl9hSXhTf0VgWHtbdnddQ2I="
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
app.component("MISACheckbox", MISACheckbox);
app.component("MISACombobox", MISACombobox);
app.component("MISAInput", MISAInput);
app.component("MISAInputLicense", MISAInputLicense);
app.component("MISADatepicker", MISADatepicker);
app.component("ValidateAlert", ValidateAlert);


app.mount("#app");
