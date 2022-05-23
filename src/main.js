import { createApp } from 'vue'
import App from './App.vue';

import { registerLicense } from '@syncfusion/ej2-base';
import Paginate from "vuejs-paginate-next";

// Registering Syncfusion license key
registerLicense(
  'ORg4AjUWIQA/Gnt2VVhhQlFaclhJW3xLYVF2R2FJfl56dlNMYl9BJAtUQF1hS35WdkZhW31WcHNcRmNe'
);

const app = createApp(App);
app.component("MISAPagination", Paginate);

app.mount('#app')