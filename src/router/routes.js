import TheMain from '../components/layout/TheMain';
import TheLogin from '../components/layout/TheLogin';
import { createRouter, createWebHistory } from "vue-router";
import store from "../store/store";

const routes = [
    {
        path: "/main",
        name: "Main",
        component: TheMain,
        meta: { requiresAuth: true }
    },
    {
        path: "/",
        name: "Login",
        component: TheLogin,
        meta: { guest: true },
    },
];

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

router.beforeEach(async (to, from, next) => {

    if (to.matched.some((record) => record.meta.requiresAuth)){
        if (store.getters.isAuthentication) {
            next();
            return;
        }
        next("/");
    } else next();
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.guest)) {
        if (store.getters.isAuthentication) {
            next("/main");
            return;
        }
        next();
    } else {
        next();
    }
  });
export default router;