import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";


import { registerLicense } from "@syncfusion/ej2-base";
import Paginate from "vuejs-paginate-next";
import router from './routes';

// Registering Syncfusion license key
registerLicense(
    "ORg4AjUWIQA/Gnt2VVhhQlFaclhJW3xLYVF2R2FJfl56dlNMYl9BJAtUQF1hS35WdkZhW31WcHNcRmNe"
);

const store = createStore({
    state() {
        return {
            isAuthen: false,
        };
    },
    mutations: {
        setIsAuth(state, isAuth) {
            if (isAuth == true) {
                state.isAuthen = true;
            } else state.isAuthen = false;
        },
    },
    getters: {
        isAuthentication(state) {
            return state.isAuthen;
        }
    }
});





router.beforeEach(async (to, from, next) => {
    const { isAuthentication } = store.getters;
    // next-line: check if route ("to" object) needs authenticated
    if (to.matched.some((record) => record.meta.requiresAuth) && isAuthentication == false) {
        next('/');
    } else if (isAuthentication == true) {
        switch (to.name) {
            case 'Login':
                next({ path: '/' });
                break;
            case 'Main':
                next();
                break;
            default:
                next();
                break;
        }
    } else next();
});

const app = createApp(App);
app.component("MISAPagination", Paginate);
app.use(require("vue3-shortkey"));
app.use(router);
app.use(store);

app.mount("#app");
