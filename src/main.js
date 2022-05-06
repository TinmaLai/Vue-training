import { createApp } from 'vue'
import App from './App.vue';

import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense(
  'ORg4AjUWIQA/Gnt2VVhhQlFaclhJW3xLYVF2R2FJfl56dlNMYl9BJAtUQF1hS35WdkZhW31WcHNcRmNe'
);
createApp(App).mount('#app')