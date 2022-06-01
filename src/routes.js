import TheMain from './components/layout/TheMain';
import TheLogin from './components/layout/TheLogin';
import { createRouter, createWebHistory } from "vue-router";

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
        meta: { requiresAuth: false },
    },
];

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

export default router;